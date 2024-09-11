import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import '../styles/AdminCalendar.css';

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayAppointments, setDayAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No admin token found');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/admin/appointments', {
        headers: { 'x-auth-token': token }
      });

      console.log('Raw response data:', response.data); // Debugging response data
      const formattedEvents = response.data.map(apt => ({
        title: apt.service,
        date: apt.date,
        extendedProps: { ...apt }
      }));
      console.log('Formatted events:', formattedEvents); // Debugging formatted events
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDateClick = (arg) => {
    console.log('Clicked date:', arg.date); // Debugging clicked date
    if (!arg.date || isNaN(arg.date)) {
      console.error('Invalid date clicked:', arg.date);
      return;
    }

    setSelectedDate(arg.date);

    const appointments = events.filter(event => {
      const eventDate = new Date(event.date);
      console.log(`Comparing event date: ${eventDate} with clicked date: ${arg.date}`); // Debugging event vs clicked date comparison
      return eventDate.toDateString() === arg.date.toDateString();
    });

    console.log('Filtered appointments for selected date:', appointments); // Debugging filtered appointments
    setDayAppointments(appointments);
  };

  const handleEventClick = (info) => {
    console.log('Event clicked:', info.event); // Debugging event object
    const eventDate = info.event.start;
    console.log('Event start date:', eventDate); // Debugging event start date
    handleDateClick({ date: eventDate });
  };

  return (
    <div className="admin-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventColor="#378006"
        eventClick={handleEventClick} // Keep event click handler
      />
      {selectedDate && (
        <div className="day-appointments">
          <h3>Appointments for {selectedDate.toDateString()}</h3>
          {dayAppointments.map((apt, index) => (
            <div key={index} className="appointment-item">
              <p>{apt.extendedProps.service} - {new Date(apt.date).toLocaleTimeString()}</p>
              <p>Client: {apt.extendedProps.userId?.name || 'Unknown'}</p> {/* Handle missing user data */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
