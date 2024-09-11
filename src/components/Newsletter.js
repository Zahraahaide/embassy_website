import React, { useState } from 'react';
import '../styles/Newsletter.css';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Import images
import news1 from '../assets/images/news1.jpg';
import news2 from '../assets/images/news2.jpg';
import news3 from '../assets/images/news3.jpg';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';

const articles = [
  { title: 'Embassy Announces New Visa Policies', image: news1, excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { title: 'Cultural Exchange Program Launched', image: news2, excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { title: 'Ambassador Hosts Annual Diplomatic Gala', image: news3, excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
];

const slides = [
  { image: slide1, caption: 'Celebrating our national day with pride and joy' },
  { image: slide2, caption: 'Promoting international cooperation and understanding' },
  { image: slide3, caption: 'Showcasing our rich cultural heritage' }
];

const events = [
  { title: 'Visa Information Session', date: '2024-09-15', location: 'Embassy Auditorium', description: 'Learn about the latest visa policies and application procedures.' },
  { title: 'Cultural Exhibition Opening', date: '2024-09-22', location: 'National Gallery', description: 'Celebrating the art and culture of our nation with a special exhibition.' },
  { title: 'Business Networking Event', date: '2024-09-30', location: 'Embassy Gardens', description: 'Connect with business leaders and explore investment opportunities.' }
];

function Newsletter() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <div className="articles-section">
          <h2 className="section-title">Latest News</h2>
          <div className="articles-list">
            {articles.map((article, index) => (
              <article key={index} className="article-card">
                <img src={article.image} alt={article.title} className="article-image" />
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <button className="read-more">Read More</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="slideshow-section">
          <h2 className="section-title">Embassy Highlights</h2>
          <div className="slideshow">
            <img src={slides[currentSlide].image} alt="Slideshow" className="slide-image" />
            <p className="slide-caption">{slides[currentSlide].caption}</p>
            <button className="slide-nav prev" onClick={prevSlide}><FaChevronLeft /></button>
            <button className="slide-nav next" onClick={nextSlide}><FaChevronRight /></button>
          </div>
        </div>

        <div className="events-section">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-list">
            {events.map((event, index) => (
              <div key={index} className="event-card">
                <div className="event-date">
                  <FaCalendarAlt />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <h3 className="event-title">{event.title}</h3>
                <div className="event-location">
                  <FaMapMarkerAlt />
                  <span>{event.location}</span>
                </div>
                <p className="event-description">{event.description}</p>
                <button className="event-rsvp">RSVP</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
