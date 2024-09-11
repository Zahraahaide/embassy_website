import React from 'react';
import { FaFileAlt, FaLanguage, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import '../styles/ServiceDetail.css';

function DocumentAuthentication() {
  return (
    <div className="service-detail">
      <h1>Document Authentication Service</h1>
      <p className="service-intro">Authenticate your Iraqi documents for use in Hungary. We provide legal certification for various documents to ensure their validity for official purposes in Hungary.</p>
      
      <div className="info-section">
        <h2>Documents We Authenticate</h2>
        <ul>
          <li><FaFileAlt /> Educational certificates and transcripts</li>
          <li><FaFileAlt /> Marriage certificates</li>
          <li><FaFileAlt /> Birth certificates</li>
          <li><FaFileAlt /> Police clearance certificates</li>
          <li><FaFileAlt /> Other official Iraqi documents</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Process</h2>
        <ol>
          <li>Submit your original document(s) in person at the embassy</li>
          <li>Provide a copy of each document</li>
          <li>Pay the authentication fee</li>
          <li>Wait for processing</li>
          <li>Collect your authenticated documents from the embassy</li>
        </ol>
      </div>

      <div className="info-section">
        <h2>Additional Information</h2>
        <p><FaLanguage /> Documents must be in Arabic or English. If in another language, a certified translation is required.</p>
        <p><FaMoneyBillWave /> Authentication Fee: 50 EUR per document (subject to change)</p>
        <p><FaCalendarAlt /> Processing Time: 3-5 working days</p>
      </div>

      <div className="cta-section">
        <a href="/book-appointment" className="cta-button">Book an Appointment</a>
      </div>
    </div>
  );
}

export default DocumentAuthentication;