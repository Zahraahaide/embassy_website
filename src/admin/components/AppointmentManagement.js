import React from 'react';

const AppointmentManagement = ({ appointments, confirmAppointment }) => {
  return (
    <div>
      <h2>Appointment Management</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id}>
          <p>{appointment.service}</p>
          <button onClick={() => confirmAppointment(appointment._id)}>Confirm</button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentManagement;
