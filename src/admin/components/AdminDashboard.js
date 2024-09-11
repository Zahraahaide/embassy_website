import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import VisaManagement from './VisaManagement';
import AdminCalendar from './AdminCalendar';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }
  
      try {
        setLoading(true);
        const config = {
          headers: { 'x-auth-token': token }
        };
        const [usersResponse, appointmentsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', config),
          axios.get('http://localhost:5000/api/admin/appointments', config)
        ]);
        setUsers(usersResponse.data);
        setAppointments(appointmentsResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
        if (err.response && err.response.status === 403) {
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  const handleApproveUser = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/approve`, {}, {
        headers: { 'x-auth-token': token }
      });
      setUsers((prevUsers) => prevUsers.map(user => user._id === userId ? { ...user, approved: true } : user));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/appointments/${appointmentId}/confirm`, {}, {
        headers: { 'x-auth-token': token }
      });
      setAppointments((prevAppointments) => prevAppointments.map(app => app._id === appointmentId ? { ...app, status: 'confirmed' } : app));
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard">Overview</Link></li>
          <li><Link to="/admin/dashboard/users">Users</Link></li>
          <li><Link to="/admin/dashboard/appointments">Appointments</Link></li>
          <li><Link to="/admin/dashboard/visas">Visa Management</Link></li>
          <li><Link to="/admin/dashboard/calendar">Calendar</Link></li>
        </ul>
      </nav>
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<Overview users={users} appointments={appointments} />} />
          <Route path="/users" element={<UsersList users={users} handleApproveUser={handleApproveUser} />} />
          <Route path="/appointments" element={<AppointmentsList appointments={appointments} handleConfirmAppointment={handleConfirmAppointment} />} />
          <Route path="/visas" element={<VisaManagement />} />
          <Route path="/calendar" element={<AdminCalendar />} />
        </Routes>
      </div>
    </div>
  );
};
// Table component for displaying users
const UsersList = ({ users, handleApproveUser }) => (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Passport Number</th>
          <th>Nationality</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.passportNumber}</td>
            <td>{user.nationality}</td>
            <td>{user.approved ? 'Approved' : 'Pending'}</td>
            <td>
              {!user.approved && (
                <button onClick={() => handleApproveUser(user._id)}>Approve</button>
              )}
              <a href={`http://localhost:5000/${user.passportImagePath}`} target="_blank" rel="noopener noreferrer">View ID</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Table component for displaying appointments
const AppointmentsList = ({ appointments, handleConfirmAppointment }) => (
  <div>
    <h2>Appointments</h2>
    <table>
      <thead>
        <tr>
          <th>Service</th>
          <th>Date</th>
          <th>User</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(appointment => (
          <tr key={appointment._id}>
            <td>{appointment.service}</td>
            <td>{new Date(appointment.date).toLocaleString()}</td>
            <td>{appointment.userId.name}</td>
            <td>{appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}</td>
            <td>
              {appointment.status === 'pending' && (
                <button onClick={() => handleConfirmAppointment(appointment._id)}>Confirm</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Overview = ({ users, appointments }) => (
  <div>
    <h2>Overview</h2>
    <p>Total Users: {users.length}</p>
    <p>Total Appointments: {appointments.length}</p>
  </div>
);

export default AdminDashboard;
