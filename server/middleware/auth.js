const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.token || null;

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');

    // attach minimal user info; optionally fetch full user
    req.user = { id: decoded.id };

    try {
      const user = await User.findById(decoded.id).select('-password');
      if (user) req.user = user;
    } catch (e) {
      // ignore DB lookup failure (req.user.id is still available)
    }

    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
