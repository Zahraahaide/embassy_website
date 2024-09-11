const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const validateAppointment = require('../middleware/validateAppointment');

// Create a new appointment
router.post('/', auth, validateAppointment, async (req, res) => {
  try {
    const { service, date } = req.body;
    const newAppointment = new Appointment({
      userId: req.user.id,  // This comes from the auth middleware
      service,
      date,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all appointments for a user
router.get('/user', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin route to fetch all appointments
router.get('/admin/appointments', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/', auth, async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    try {
      const appointments = await Appointment.find().populate('userId', 'name');
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
