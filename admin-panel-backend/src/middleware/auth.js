const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token:', token);
  console.log('JWT_SECRET in auth:', process.env.JWT_SECRET);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = auth;