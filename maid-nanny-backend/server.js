import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Allow multiple origins in production
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// MongoDB Connection (Cached for Serverless)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/maid-nanny-db').then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Middleware to ensure DB connection on every request (Vercel best practice)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database Connection Failed" });
  }
});

// Pre-load Models
import { User, Helper, Booking, Complaint } from './models/index.js';

// Routes Configuration
import authRoutes from './routes/auth.js';
import helperRoutes from './routes/helpers.js';
import bookingRoutes from './routes/bookings.js';
import platformRoutes from './routes/platform.js';

app.use('/api/auth', authRoutes);
app.use('/api/helpers', helperRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/platform', platformRoutes);

// Admin Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const counts = {
      registeredHouseholds: await User.countDocuments({ role: 'household' }),
      verifiedHelpers: await Helper.countDocuments({ verified: true }),
      activeBookings: await Booking.countDocuments({ status: 'Active' }),
      pendingComplaints: await Complaint.countDocuments({ status: 'Open' }),
      satisfactionRate: "98%"
    };
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Only listen locally, Vercel handles this in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Backend Server running on port ${PORT}`));
}

export default app;
