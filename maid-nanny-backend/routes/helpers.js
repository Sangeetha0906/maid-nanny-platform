import express from 'express';
import { Helper } from '../models/index.js';

const router = express.Router();

// Get all verified helpers, with optional Type filtering
router.get('/', async (req, res) => {
  try {
    const { type, all, userId } = req.query;
    let filter = {};
    if (type && type !== 'All') filter.type = type;
    if (userId) filter.userId = userId;
    if (!all) filter.verified = true;
    
    const helpers = await Helper.find(filter);
    
    // If DB is completely empty, insert our MockData payload logic via seed
    if (helpers.length === 0) {
      // Mock seed (only runs if array is totally blank and you fetch helpers)
      const mock = [
        { userId: "000000000000000000000001", name: "Maria Garcia", type: "Maid", experience: "5 Years", rating: 4.8, reviews: 124, verified: true, plans: { hourly: "$25/hr", monthly: "$800/mo", yearly: "$9000/yr"}, avatar: "https://i.pravatar.cc/150?u=maria", about: "Reliable maid." }
      ];
      await Helper.insertMany(mock);
      const newHelpers = await Helper.find(filter);
      return res.json(newHelpers);
    }

    res.json(helpers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single helper profile
router.get('/:id', async (req, res) => {
  try {
    const helper = await Helper.findById(req.params.id);
    if (!helper) return res.status(404).json({ message: 'Helper not found' });
    res.json(helper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update helper verified status (Admin)
router.patch('/:id/verify', async (req, res) => {
  try {
    const { verified } = req.body;
    const helper = await Helper.findByIdAndUpdate(
      req.params.id,
      { verified },
      { new: true }
    );
    if (!helper) return res.status(404).json({ message: 'Helper not found' });
    res.json(helper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
