import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

function SignIn({ onSignIn }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSignIn(data.user);
        navigate('/');
      } else {
        setMessage(data.message || 'Sign in failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign In to Embassy Services</h2>
        {message && <p className="error-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;