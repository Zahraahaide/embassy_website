const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const VisaApplication = require('../models/VisaApplication')
// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      let admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const payload = {
        user: {
          id: admin.id,
          isAdmin: true
        }
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
// Get all users (Admin-only route)
router.get('/users', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Approve a user (Admin-only route)
router.put('/users/:id/approve', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.approved = true;
    await user.save();
    res.json({ msg: 'User approved successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Confirm an appointment (Admin-only route)
router.put('/appointments/:id/confirm', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    appointment.status = 'confirmed';
    await appointment.save();
    res.json({ msg: 'Appointment confirmed successfully', appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/appointments', auth, async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    try {
      const appointments = await Appointment.find().populate('userId', 'name email');
      res.json(appointments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/visa-applications', auth, async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    try {
      const applications = await VisaApplication.find().populate('userId', 'name email');
      res.json(applications);
    } catch (err) {
      console.error('Error fetching visa applications:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update visa application status
  router.put('/visa-applications/:caseId', auth, async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    try {
      const { status } = req.body;
      const application = await VisaApplication.findOneAndUpdate(
        { caseId: req.params.caseId },
        { 
          status,
          reviewDate: Date.now(),
          reviewedBy: req.user.id
        },
        { new: true }
      );
      if (!application) {
        return res.status(404).json({ msg: 'Application not found' });
      }
      res.json(application);
    } catch (err) {
      console.error('Error updating visa application:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;