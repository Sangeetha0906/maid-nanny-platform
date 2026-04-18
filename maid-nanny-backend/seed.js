import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Helper, Booking } from './models/index.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas for seeding...');

    // Clear existing data (Optional - remove if you want to keep current data)
    await User.deleteMany({});
    await Helper.deleteMany({});
    await Booking.deleteMany({});

    // Create Admin
    const admin = await User.create({
      name: 'Platform Admin',
      email: 'admin@maidnanny.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create a Household User
    const user = await User.create({
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      password: 'password123',
      role: 'household'
    });

    // Create Helpers
    const helpers = [
      {
        name: 'Maria Garcia',
        type: 'Maid',
        experience: '5 Years',
        location: 'Downtown',
        rating: 4.8,
        reviews: 124,
        verified: true,
        skills: ['Deep Cleaning', 'Organization', 'Ironing'],
        about: 'Professional cleaner with 5 years of experience in residential homes. Very punctual and detail-oriented.',
        plans: { hourly: '$25/hr', monthly: '$800/mo', yearly: '$9000/yr' },
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        name: 'Elena Rodriguez',
        type: 'Babysitter',
        experience: '3 Years',
        location: 'Suburbs',
        rating: 4.9,
        reviews: 82,
        verified: false, // Pending for Admin to verify
        skills: ['Infant Care', 'First Aid', 'Cooking'],
        about: 'Patient and loving babysitter. I love playing creative games with kids and helping with homework.',
        plans: { hourly: '$20/hr', monthly: '$700/mo', yearly: '$8000/yr' },
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      {
        name: 'Jessica Smith',
        type: 'Nanny',
        experience: '8 Years',
        location: 'Uptown',
        rating: 4.7,
        reviews: 210,
        verified: true,
        skills: ['Child Development', 'Newborn Care', 'Swimming'],
        about: 'Certified nanny with extensive experience in full-time child care and early childhood education.',
        plans: { hourly: '$30/hr', monthly: '$1200/mo', yearly: '$13000/yr' },
        avatar: 'https://i.pravatar.cc/150?img=16'
      }
    ];

    for (const h of helpers) {
      const helperUser = await User.create({
        name: h.name,
        email: `${h.name.toLowerCase().replace(' ', '.')}@helper.com`,
        password: 'password123',
        role: 'helper'
      });
      
      await Helper.create({
        ...h,
        userId: helperUser._id
      });
    }

    // Create a Complaint
    const { Complaint } = await import('./models/index.js');
    await Complaint.create({
      userId: user._id,
      subject: 'Delay in Service',
      description: 'The helper arrived 30 minutes late for the first session. Please look into this.',
      status: 'Open'
    });

    // Create an Active Booking
    const jessica = await Helper.findOne({ name: 'Jessica Smith' });
    await Booking.create({
      householdId: user._id,
      helperId: jessica._id,
      plan: 'Monthly',
      startDate: new Date(),
      status: 'Active'
    });

    console.log('✅ Seeding complete! Your database is now populated.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
