import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Banner.css';
import { FaChevronDown } from 'react-icons/fa';

function Banner() {
  const navigate = useNavigate();

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    if (selectedService === 'consulate') {
      navigate('/consular-services');
    } else if (selectedService === 'citizen') {
      navigate('/citizen-services');
    } else if (selectedService === 'visa') {
        navigate('/visa-services');
      }
    // Add other service navigations here if needed
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h1 className="banner-title">Welcome to IRAQ Embassy</h1>
        <p className="banner-subtitle">Serving You Across Borders</p>
        <div className="dropdown-container">
          <select className="services-dropdown" onChange={handleServiceChange}>
            <option value="" disabled selected>Select a Service</option>
            <option value="consulate">Consulate Services</option>
            <option value="citizen">Citizen Services</option>
            <option value="visa">Visa Services</option>
            <option value="authorise">Authorise Services</option>
          </select>
          <FaChevronDown className="dropdown-icon" />
        </div>
      </div>
    </div>
  );
}

export default Banner;