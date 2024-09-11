import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WorldNewsTimeline.css';

const API_KEY = '0479f5752989c60956b36b57d77d2b28'; 
const API_URL = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&max=9`;

function WorldNewsTimeline() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setNews(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
    const intervalId = setInterval(fetchNews, 30 * 60 * 1000); // Fetch news every 30 minutes

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  if (loading) return <div className="loading">Loading world news...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="world-news-timeline">
      <h2 className="section-title">World News</h2>
      <div className="news-grid">
        {news.map((item, index) => (
          <div key={index} className="news-card">
            <img
              src={item.image || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={item.title}
              className="news-image"
            />
            <div className="news-content">
              <h3 className="news-title">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>
              <p className="news-description">{item.description}</p>
              <div className="news-meta">
                <span className="news-source">{item.source.name}</span>
                <span className="news-date">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorldNewsTimeline;
