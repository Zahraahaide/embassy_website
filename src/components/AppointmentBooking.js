import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/AppointmentBooking.css';

function AppointmentBooking() {
  const [user, setUser] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'x-auth-token': token
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error('Unauthorized: Invalid or expired token');
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Please sign in to book an appointment.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          service: serviceType,
          date: new Date(date.setHours(time.split(':')[0], time.split(':')[1])).toISOString()
        })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/appointment-confirmation', { state: { appointment: data } });
      } else {
        setMessage(data.message || 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  if (loading) {
    return <div className="appointment-booking">Loading...</div>;
  }

  if (error) {
    return (
      <div className="appointment-booking">
        <h2>Error</h2>
        <p>{error}</p>
        <p>Please <a href="/signin">sign in</a> or <a href="/signup">sign up</a> to book an appointment.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="appointment-booking">
        <h2>Book an Appointment</h2>
        <p>Please <a href="/signin">sign in</a> or <a href="/signup">sign up</a> to book an appointment.</p>
      </div>
    );
  }

  return (
    <div className="appointment-booking">
      <h2>Book an Appointment</h2>
      <div className="user-info">
        <p>Welcome, {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Nationality: {user.nationality}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serviceType">Service Type</label>
          <select id="serviceType" value={serviceType} onChange={handleServiceChange} required>
            <option value="">Select a service</option>
            <option value="visa">Visa</option>
            <option value="passport">Passport</option>
            <option value="certification">Document Certification</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <Calendar onChange={setDate} value={date} minDate={new Date()} />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <select id="time" value={time} onChange={handleTimeChange} required>
            <option value="">Select a time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>
        <button type="submit" className="book-btn">Book Appointment</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AppointmentBooking;