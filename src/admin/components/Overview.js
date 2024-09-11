import React from 'react';

const Overview = ({ users, appointments }) => {
  return (
    <div>
      <h2>Overview</h2>
      <p>Total Users: {users.length}</p>
      <p>Total Appointments: {appointments.length}</p>
    </div>
  );
};

export default Overview;
