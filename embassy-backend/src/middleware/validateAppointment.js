const Appointment = require('../models/Appointment');

const validateAppointment = async (req, res, next) => {
  const { date, service } = req.body;
  const appointmentDate = new Date(date);

  // Check if the appointment is in the future
  if (appointmentDate < new Date()) {
    return res.status(400).json({ message: 'Appointment date must be in the future' });
  }

  // Check if the appointment is during business hours (assuming 9 AM to 5 PM)
  const hours = appointmentDate.getHours();
  if (hours < 9 || hours >= 17) {
    return res.status(400).json({ message: 'Appointments must be between 9 AM and 5 PM' });
  }

  // Check if the slot is already booked
  const existingAppointment = await Appointment.findOne({
    date: {
      $gte: new Date(appointmentDate.setHours(0, 0, 0)),
      $lt: new Date(appointmentDate.setHours(23, 59, 59)),
    },
    service,
  });

  if (existingAppointment) {
    return res.status(400).json({ message: 'This time slot is already booked' });
  }

  next();
};

module.exports = validateAppointment;
