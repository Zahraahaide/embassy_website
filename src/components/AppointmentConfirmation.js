import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaUser, FaPassport } from 'react-icons/fa';
import '../styles/AppointmentConfirmation.css';

function AppointmentConfirmation() {
  const location = useLocation();
  const { appointment } = location.state || {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'x-auth-token': token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setUser(data);
        }
      })
      .catch(err => console.error(err));
    }
  }, []);

  if (!appointment || !user) {
    return (
      <div className="appointment-confirmation">
        <h2>No appointment information available</h2>
        <Link to="/book-appointment" className="book-again-btn">Book an Appointment</Link>
      </div>
    );
  }

  const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(appointment.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="appointment-confirmation">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <FaCheckCircle className="check-icon" />
          <h2>Appointment Confirmed</h2>
        </div>
        <div className="confirmation-body">
          <p className="confirmation-message">
            Thank you for booking your appointment with the Iraq Embassy. Your appointment details are as follows:
          </p>
          <div className="appointment-details">
            <div className="detail-item">
              <FaUser className="detail-icon" />
              <span className="detail-label">Name:</span>
              <span className="detail-value">{user.name}</span>
            </div>
            <div className="detail-item">
              <FaPassport className="detail-icon" />
              <span className="detail-label">Nationality:</span>
              <span className="detail-value">{user.nationality}</span>
            </div>
            <div className="detail-item">
              <FaCalendarAlt className="detail-icon" />
              <span className="detail-label">Date:</span>
              <span className="detail-value">{formattedDate}</span>
            </div>
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <span className="detail-label">Time:</span>
              <span className="detail-value">{formattedTime}</span>
            </div>
            <div className="detail-item">
              <FaUser className="detail-icon" />
              <span className="detail-label">Service:</span>
              <span className="detail-value">{appointment.service}</span>
            </div>
            <div className="detail-item">
              <FaPassport className="detail-icon" />
              <span className="detail-label">Appointment ID:</span>
              <span className="detail-value">{appointment._id}</span>
            </div>
          </div>
          <div className="confirmation-footer">
            <p className="note">
              Please arrive 15 minutes before your scheduled appointment time. Don't forget to bring any necessary documents related to your {appointment.service}.
            </p>
            <p className="contact-info">
              If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance at <a href="mailto:appointments@iraqembassy.com">appointments@iraqembassy.com</a> or call +1 (123) 456-7890.
            </p>
          </div>
        </div>
      </div>
      <Link to="/book-appointment" className="book-again-btn">Book Another Appointment</Link>
    </div>
  );
}

export default AppointmentConfirmation;