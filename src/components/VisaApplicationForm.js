import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/VisaApplicationForm.css';

const VisaApplicationForm = () => {
  const [formData, setFormData] = useState({
    visaType: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiryDate: '',
    entryDate: '',
    exitDate: '',
    purpose: '',
    address: '',
    phone: '',
    email: '',
  });
  const [documents, setDocuments] = useState({
    passport: null,
    photo: null,
    invitation: null,
    financialProof: null,
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      // Fetch user data
      axios.get('/api/users/profile', {
        headers: { 'x-auth-token': token }
      })
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
    Object.keys(documents).forEach(key => {
      if (documents[key]) formDataToSend.append(key, documents[key]);
    });
  
    try {
      const response = await axios.post('http://localhost:5000/api/visa/apply', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      });
      alert(`Visa application submitted successfully. Your case ID is: ${response.data.caseId}`);
      navigate('/visa-status');
    } catch (error) {
      console.error('Error submitting visa application:', error);
      alert(`Error submitting visa application: ${error.response?.data?.message || error.message}`);
    }
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="visa-application-form">
      <h2>Visa Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="visaType">Visa Type</label>
          <select name="visaType" value={formData.visaType} onChange={handleChange} required>
            <option value="">Select Visa Type</option>
            <option value="tourist">Tourist Visa</option>
            <option value="business">Business Visa</option>
            <option value="student">Student Visa</option>
            <option value="work">Work Visa</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="passportNumber">Passport Number</label>
          <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="passportExpiryDate">Passport Expiry Date</label>
          <input type="date" name="passportExpiryDate" value={formData.passportExpiryDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="entryDate">Intended Date of Entry</label>
          <input type="date" name="entryDate" value={formData.entryDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="exitDate">Intended Date of Exit</label>
          <input type="date" name="exitDate" value={formData.exitDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose of Visit</label>
          <textarea name="purpose" value={formData.purpose} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address in Iraq</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="passport">Passport Copy</label>
          <input type="file" name="passport" onChange={handleFileChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Recent Photograph</label>
          <input type="file" name="photo" onChange={handleFileChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="invitation">Invitation Letter (if applicable)</label>
          <input type="file" name="invitation" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label htmlFor="financialProof">Proof of Financial Means</label>
          <input type="file" name="financialProof" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
};

export default VisaApplicationForm;