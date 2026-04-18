import express from 'express';
import { Complaint } from '../models/index.js';

const router = express.Router();

// Get all complaints (Admin only)
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name email role');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a new complaint
router.post('/complaints', async (req, res) => {
  try {
    const { userId, subject, description } = req.body;
    const complaint = new Complaint({ userId, subject, description });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resolve a complaint (Admin)
router.patch('/complaints/:id/resolve', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: 'Resolved' },
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
