import React, { useState } from 'react';
import { FaPlane, FaBriefcase, FaGraduationCap, FaHeart, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';
import '../styles/VisaServices.css';
import { useNavigate } from 'react-router-dom';

const visaTypes = [
  {
    type: "Tourist Visa",
    icon: <FaPlane />,
    description: "For travelers visiting Iraq for leisure, sightseeing, or short-term stays.",
    duration: "Up to 30 days",
    requirements: ["Valid passport", "Proof of accommodation", "Return ticket", "Travel insurance"]
  },
  {
    type: "Business Visa",
    icon: <FaBriefcase />,
    description: "For individuals traveling to Iraq for business meetings, conferences, or short-term work.",
    duration: "Up to 90 days",
    requirements: ["Valid passport", "Invitation letter from Iraqi company", "Company registration documents", "Proof of funds"]
  },
  {
    type: "Student Visa",
    icon: <FaGraduationCap />,
    description: "For students enrolled in Iraqi educational institutions for long-term study.",
    duration: "Duration of study program",
    requirements: ["Valid passport", "Acceptance letter from Iraqi institution", "Proof of funds", "Health insurance"]
  },
  {
    type: "Marriage Visa",
    icon: <FaHeart />,
    description: "For individuals marrying an Iraqi citizen or joining their Iraqi spouse in Iraq.",
    duration: "Up to 1 year, renewable",
    requirements: ["Valid passport", "Marriage certificate", "Spouse's Iraqi ID", "Financial documents"]
  },
  {
    type: "Family Visit Visa",
    icon: <FaUserFriends />,
    description: "For individuals visiting family members who are Iraqi citizens or residents.",
    duration: "Up to 90 days",
    requirements: ["Valid passport", "Invitation letter from family member", "Proof of relationship", "Financial guarantee"]
  }
];

const tourOffers = [
  {
    title: "Ancient Mesopotamia Tour",
    description: "Explore the cradle of civilization with visits to Babylon, Ur, and Nineveh.",
    duration: "10 days",
    price: "$1,500"
  },
  {
    title: "Kurdish Culture Experience",
    description: "Immerse yourself in the rich Kurdish culture in northern Iraq, including visits to Erbil and Sulaymaniyah.",
    duration: "7 days",
    price: "$1,200"
  },
  {
    title: "Religious Pilgrimage Tour",
    description: "Visit sacred sites in Najaf, Karbala, and Baghdad.",
    duration: "5 days",
    price: "$800"
  }
];

function VisaServices() {
    const [selectedVisa, setSelectedVisa] = useState(null);
    const navigate = useNavigate();
  
    const handleApplyForVisa = () => {
      navigate('/visa-application');
    };
  
    return (
      <div className="visa-services">
        <header className="visa-header">
          <h1>Iraq Visa Services</h1>
          <p>Discover the rich history and culture of Iraq with our comprehensive visa services</p>
        </header>
  
        <section className="visa-types">
          <h2>Types of Visas</h2>
          <div className="visa-grid">
            {visaTypes.map((visa, index) => (
              <div key={index} className="visa-card" onClick={() => setSelectedVisa(visa)}>
                <div className="visa-icon">{visa.icon}</div>
                <h3>{visa.type}</h3>
                <p>{visa.description}</p>
              </div>
            ))}
          </div>
        </section>
  
        {selectedVisa && (
          <div className="visa-modal">
            <div className="visa-modal-content">
              <h2>{selectedVisa.type}</h2>
              <p>{selectedVisa.description}</p>
              <p><strong>Duration:</strong> {selectedVisa.duration}</p>
              <h3>Requirements:</h3>
              <ul>
                {selectedVisa.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <button onClick={() => setSelectedVisa(null)}>Close</button>
            </div>
          </div>
        )}
  
        <section className="tour-offers">
          <h2>Discover Iraq: Featured Tours</h2>
          <div className="tour-grid">
            {tourOffers.map((tour, index) => (
              <div key={index} className="tour-card">
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <div className="tour-details">
                  <span><FaCalendarAlt /> {tour.duration}</span>
                  <span>Starting from {tour.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        <section className="visa-application">
          <h2>Ready to Experience Iraq?</h2>
          <p>Apply for your visa today and embark on an unforgettable journey through the land of ancient civilizations.</p>
          <button className="apply-visa-btn" onClick={handleApplyForVisa}>Apply for Visa</button>
        </section>
      </div>
    );
  }
  

export default VisaServices;