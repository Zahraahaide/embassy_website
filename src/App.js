import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Newsletter from './components/Newsletter';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import WorldNewsTimeline from './components/WorldNewsTimeline';
import IraqWeatherForecast from './components/IraqWeatherForecast';
import Footer from './components/Footer';
import ConsularServices from './components/ConsularServices';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import AdminLogin from './admin/components/AdminLogin';
import AdminDashboard from './admin/components/AdminDashboard';
import PrivateRoute from './admin/components/PrivateRoute';
import CitizenServices from './components/CitizenServices';
import PassportRenewal from './components/PassportRenewal';
import DocumentAuthentication from './components/DocumentAuthentication';
import VisaServices from './components/VisaServices';
import VisaApplicationForm from './components/VisaApplicationForm';



import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'x-auth-token': token
        }
      })
      .then(res => {
        if (res.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setUser(null);
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        if (!data.message) {
          setUser(data);
        }
      })
      .catch(err => console.error('Error fetching user profile:', err));
    }
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <Newsletter />
              <WorldNewsTimeline />
              <IraqWeatherForecast />
            </>
          } />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/consular-services" element={<ConsularServices />} />
          <Route path="/citizen-services" element={<CitizenServices />} />
          <Route path="/passport-renewal" element={<PassportRenewal />} />
          <Route path="/document-authentication" element={<DocumentAuthentication />} />
          <Route path="/visa-services" element={<VisaServices />} />
          <Route path="/visa-application" element={<VisaApplicationForm />} />



          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard/*" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;