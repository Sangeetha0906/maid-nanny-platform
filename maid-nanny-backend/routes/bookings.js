import express from 'express';
import mongoose from 'mongoose';
import { Booking } from '../models/index.js';

const router = express.Router();

// Get bookings for a user or helper
router.get('/', async (req, res) => {
  try {
    const { userId, helperId } = req.query;
    
    // In a real app we'd decode JWT here for secure querying constraint
    let filter = {};
    if (userId) filter.householdId = userId;
    if (helperId) filter.helperId = helperId;
    
    const bookings = await Booking.find(filter)
      .populate('helperId', 'name type plans avatar')
      .populate('householdId', 'name email');
      
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { householdId, helperId, plan, startDate } = req.body;
    
    const newBooking = new Booking({
      householdId,
      helperId,
      plan,
      startDate
    });
    
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, checkIn, checkOut } = req.body;
    let update = { status };
    if (checkIn) update.checkInTime = new Date();
    if (checkOut) update.checkOutTime = new Date();

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a review (PRD Compliance)
router.post('/review', async (req, res) => {
  try {
    const { Review, Helper } = await import('../models/index.js');
    const { householdId, helperId, bookingId, rating, comment } = req.body;
    
    const review = new Review({ householdId, helperId, bookingId, rating, comment });
    await review.save();
    
    // Update helper average rating (Simplified)
    const stats = await Review.aggregate([
      { $match: { helperId: new mongoose.Types.ObjectId(helperId) } },
      { $group: { _id: null, avg: { $avg: "$rating" }, total: { $sum: 1 } } }
    ]);
    
    if (stats.length > 0) {
      await Helper.findByIdAndUpdate(helperId, { 
        rating: stats[0].avg.toFixed(1),
        reviews: stats[0].total
      });
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
