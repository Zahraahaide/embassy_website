import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import '../styles/ConsularServices.css';

const serviceData = [
  {
    title: 'Iraq Visa',
    description: 'Information about obtaining a visa for Iraq.',
    steps: [
      'Check visa requirements for your nationality',
      'Gather required documents (passport, photos, etc.)',
      'Fill out the visa application form',
      'Pay the visa fee',
      'Submit your application and wait for processing'
    ]
  },
  {
    title: 'Marriage Certificate',
    description: 'Process for obtaining or authenticating a marriage certificate.',
    steps: [
      'Provide original marriage certificate',
      'Submit translated copies if the original is not in Arabic or English',
      'Verify the certificate with the Ministry of Foreign Affairs',
      'Pay the authentication fee',
      'Collect the authenticated certificate'
    ]
  },
  {
    title: 'Birth Certificate',
    description: 'How to obtain or authenticate a birth certificate.',
    steps: [
      'Submit original birth certificate',
      'Provide translated copies if the original is not in Arabic or English',
      'Verify the certificate with relevant authorities',
      'Pay the required fees',
      'Receive the authenticated birth certificate'
    ]
  },
  {
    title: 'Death Certificate',
    description: 'Process for obtaining or authenticating a death certificate.',
    steps: [
      'Present the original death certificate',
      'Submit translated copies if not in Arabic or English',
      'Verify the certificate with local authorities',
      'Pay the authentication fees',
      'Collect the authenticated death certificate'
    ]
  }
];

function ConsularServices() {
  const [expandedService, setExpandedService] = useState(null);
  const navigate = useNavigate();

  const toggleService = (index) => {
    if (expandedService === index) {
      setExpandedService(null);
    } else {
      setExpandedService(index);
    }
  };
  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };


  return (
    <div className="consular-services">
      <h1>Consular Services</h1>
      <div className="warning-box">
        <p><strong>Important:</strong> To use any consular service, you must book an appointment in advance.</p>
        <button className="book-appointment-btn" onClick={handleBookAppointment}>Book Appointment</button>

      </div>
      {serviceData.map((service, index) => (
        <div key={index} className="service-section">
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <button className="view-more-btn" onClick={() => toggleService(index)}>
            {expandedService === index ? 'View Less' : 'View More'}
            {expandedService === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {expandedService === index && (
            <div className="service-steps">
              <h3>Steps:</h3>
              <ol>
                {service.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConsularServices;