// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Helper: safe read body
const getBody = (req) => (req && req.body) ? req.body : {};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = getBody(req);

    // Check fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, msg: 'Please enter all fields' });
    }

    // Check if user exists
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, msg: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed
    });

    // Token
    const token = generateToken(user._id);

    // Optionally set cookie (comment out if you don't want cookies)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return res.status(201).json({
      success: true,
      msg: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('REGISTER ERROR >>>', err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = getBody(req);

    // Validate
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: 'Please enter all fields' });
    }

    // Find user and ensure password field is selected
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ success: false, msg: 'Invalid credentials' });

    if (!user.password) {
      console.error(`LOGIN: user found but password missing for ${email}`);
      return res.status(500).json({ success: false, msg: 'Server error' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, msg: 'Invalid credentials' });

    const token = generateToken(user._id);

    // Optionally set cookie (comment out if you don't want cookies)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return res.json({
      success: true,
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('LOGIN ERROR >>>', err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// GET LOGGED IN USER
exports.getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, msg: 'Not authorized' });
    }
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });
    return res.json({ success: true, user });
  } catch (err) {
    console.error('GETME ERROR >>>', err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// UPDATE USER DETAILS
exports.updateDetails = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, msg: 'Not authorized' });
    }

    const { name, email } = getBody(req);

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    ).select('-password');

    return res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('UPDATE DETAILS ERROR >>>', err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, msg: 'Not authorized' });
    }

    const { currentPassword, newPassword } = getBody(req);
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, msg: 'Please provide current and new password' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ success: false, msg: 'Invalid current password' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.json({ success: true, msg: 'Password updated successfully' });
  } catch (err) {
    console.error('UPDATE PASSWORD ERROR >>>', err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  try {
    // clear cookie if set
    res.clearCookie('token');
    return res.json({ success: true, msg: 'Logged out successfully' });
  } catch (err) {
    console.error('LOGOUT ERROR >>>', err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
};
