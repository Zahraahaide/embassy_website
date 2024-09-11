import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passportNumber: '',
    nationality: '',
  });
  const [passportImage, setPassportImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPassportImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
    if (passportImage) {
      formDataToSend.append('passportImage', passportImage);
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Passport image uploaded to: ' + data.passportImagePath);
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          passportNumber: '',
          nationality: '',
        });
        setPassportImage(null);
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Register for Embassy Services</h2>
        {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="passportNumber">Passport Number</label>
            <input type="text" id="passportNumber" name="passportNumber" value={formData.passportNumber} required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input type="text" id="nationality" name="nationality" value={formData.nationality} required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="passportImage">Passport Image</label>
            <input type="file" id="passportImage" name="passportImage" onChange={handleFileChange} required />
          </div>
          <button type="submit" className="signup-button">Register</button>
        </form>
        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;