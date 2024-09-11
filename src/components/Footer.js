import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Contact Info */}
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt /> Budapest, Bölöni György u. 3, 1021</p>
          <p><FaPhoneAlt /> (06 1) 392 5120</p>
          <p><FaEnvelope /> info@iraqiembassy.hu</p>
          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.3011456796787!2d19.019017715611504!3d47.51626107917882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741debbdd97e451%3A0x5e5674e2b49bf492!2zQsO2bMO2bmkgR3nDtnJneSB1LiAzLCAxMDIxIEh1bmdhcnk!5e0!3m2!1sen!2sus!4v1632913045788!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Embassy Location"
            ></iframe>
          </div>
        </div>

        {/* Working Hours */}
        <div className="footer-section working-hours">
          <h3>Working Hours</h3>
          <ul>
            <li><FaClock /> Monday: 10 AM–3 PM</li>
            <li><FaClock /> Tuesday: 10 AM–3 PM</li>
            <li><FaClock /> Wednesday: 10 AM–3 PM</li>
            <li><FaClock /> Thursday: 10 AM–3 PM</li>
            <li><FaClock /> Friday: 10 AM–12 PM</li>
            <li><FaClock /> Saturday: Closed</li>
            <li><FaClock /> Sunday: Closed</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Consular Services</a></li>
            <li><a href="/news">News & Events</a></li>
            <li><a href="/visas">Visa Information</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social-media">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" className="social-icon"><FaFacebookF /></a>
            <a href="https://twitter.com" className="social-icon"><FaTwitter /></a>
            <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
            <a href="https://linkedin.com" className="social-icon"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2023 Embassy of Iraq in Hungary. All rights reserved.</p>
        <p>Ambassador: H.E. Zahraa Haidar Adnan</p>
      </div>
    </footer>
  );
}

export default Footer;
