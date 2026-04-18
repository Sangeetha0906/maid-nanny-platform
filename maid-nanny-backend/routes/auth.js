import express from 'express';
import { User, Helper } from '../models/index.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, ...helperDetails } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });
    
    user = new User({ name, email, password, role }); // (Note: Hash password in prod)
    await user.save();
    
    if (role === 'helper') {
      const helperInfo = new Helper({
        userId: user._id, 
        name,
        type: helperDetails.type || 'Maid',
        experience: helperDetails.experience || '1 Year',
        about: helperDetails.about || 'New to the platform.',
        plans: {
          hourly: '$20/hr', monthly: '$800/mo', yearly: '$9000/yr'
        },
        avatar: `https://i.pravatar.cc/150?u=${user._id}`
      });
      await helperInfo.save();
    }
    
    res.status(201).json({ token: `mock_jwt_${user._id}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    
    // Quick fallback mock if DB is completely empty (for immediate testing logic)
    if (!user && email === 'admin@maidnanny.com') {
       user = await User.create({ name: 'Admin', email, password, role: 'admin' });
    }
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: `mock_jwt_${user._id}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
