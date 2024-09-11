import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <nav className="admin-sidebar">
      <ul>
        <li><Link to="/admin/dashboard">Overview</Link></li>
        <li><Link to="/admin/dashboard/users">User Management</Link></li>
        <li><Link to="/admin/dashboard/appointments">Appointment Management</Link></li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
