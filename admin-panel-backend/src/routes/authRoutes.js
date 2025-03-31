const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log(`🔍 Received login request with username: ${username}`);  // Log incoming request

  try {
    const user = await User.findOne({ username });
    console.log(`🔎 User found:`, user);  // Log the retrieved user

    if (!user) {
      console.log(`❌ User not found`);
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const isMatch = await user.comparePassword(password);
    console.log(`🔑 Password match status: ${isMatch}`);  // Log password match status

    if (!isMatch) {
      console.log(`❌ Incorrect password`);
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const secretKey = process.env.JWT_SECRET || 'fallbackSecret';
    console.log(`🔐 Using JWT secret: ${secretKey}`);  // Log JWT secret used

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      secretKey,
      { expiresIn: '1h' }
    );

    console.log(`✅ Token generated: ${token}`);  // Log generated token

    res.json({ token });
  } catch (err) {
    console.error(`🔥 Server error:`, err);  // Log the error details
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
