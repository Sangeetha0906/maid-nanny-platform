import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['household', 'helper', 'admin'], default: 'household' }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);

const helperSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Maid', 'Nanny', 'Babysitter'] },
  experience: String,
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  availability: { type: String, default: 'Available' },
  location: String,
  skills: [String],
  about: String,
  plans: {
    hourly: String,
    monthly: String,
    yearly: String
  },
  avatar: String
});

export const Helper = mongoose.models.Helper || mongoose.model('Helper', helperSchema);

const bookingSchema = new mongoose.Schema({
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  helperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Helper', required: true },
  plan: { type: String, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Active', 'Completed', 'Cancelled'], default: 'Pending' },
  checkInTime: Date,
  checkOutTime: Date,
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

const reviewSchema = new mongoose.Schema({
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  helperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Helper', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

export const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);
