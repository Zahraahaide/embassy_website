import React from 'react';
import { Link } from 'react-router-dom';
import { FaPassport, FaFileAlt, FaUniversity, FaHandshake } from 'react-icons/fa';
import '../styles/CitizenServices.css';

const services = [
  {
    title: "Passport Renewal",
    description: "Renew your Iraqi passport while in Hungary. Our efficient process ensures you can maintain valid travel documents.",
    icon: <FaPassport />,
    link: "/passport-renewal"
  },
  {
    title: "Document Authentication",
    description: "Authenticate official Iraqi documents for use in Hungary. We provide legal certification for various documents including educational certificates, marriage certificates, and more.",
    icon: <FaFileAlt />,
    link: "/document-authentication"
  },
  {
    title: "Educational Assistance",
    description: "Get support for education-related matters in Hungary. We offer guidance on school enrollment, university admissions, and recognition of Iraqi qualifications.",
    icon: <FaUniversity />,
    link: "/educational-assistance"
  },
  {
    title: "Cultural Integration Support",
    description: "Access resources to help with cultural integration in Hungary. We provide information on local customs, language resources, and community events to help you adjust to life in Hungary.",
    icon: <FaHandshake />,
    link: "/cultural-integration"
  }
];

function CitizenServices() {
  return (
    <div className="citizen-services">
      <h1>Citizen Services for Iraqis in Hungary</h1>
      <p className="services-intro">The Embassy of Iraq in Hungary is committed to supporting our citizens. We offer the following services to assist you during your stay:</p>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-icon">{service.icon}</div>
            <div className="service-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Link to={service.link} className="service-link">Learn More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitizenServices;