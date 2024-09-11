import React from 'react';
import { FaPassport, FaFileAlt, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import '../styles/ServiceDetail.css';

function PassportRenewal() {
  return (
    <div className="service-detail">
      <h1>Passport Renewal Service</h1>
      <p className="service-intro">Renew your Iraqi passport efficiently while in Hungary. Our streamlined process ensures you can maintain valid travel documents with ease.</p>
      
      <div className="info-section">
        <h2>Requirements</h2>
        <ul>
          <li><FaPassport /> Current passport (even if expired)</li>
          <li><FaFileAlt /> Completed passport renewal application form</li>
          <li><FaFileAlt /> Two recent passport-sized photographs</li>
          <li><FaFileAlt /> Proof of residence in Hungary</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Process</h2>
        <ol>
          <li>Submit your application and required documents in person at the embassy</li>
          <li>Pay the renewal fee</li>
          <li>Biometric data collection (if required)</li>
          <li>Wait for processing (typically 4-6 weeks)</li>
          <li>Collect your new passport from the embassy</li>
        </ol>
      </div>

      <div className="info-section">
        <h2>Additional Information</h2>
        <p><FaMoneyBillWave /> Renewal Fee: 100 EUR (subject to change)</p>
        <p><FaCalendarAlt /> Processing Time: 4-6 weeks</p>
      </div>

      <div className="cta-section">
        <a href="/book-appointment" className="cta-button">Book an Appointment</a>
      </div>
    </div>
  );
}

export default PassportRenewal;