import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDust } from 'react-icons/wi';
import '../styles/IraqWeatherForecast.css';

const API_KEY = 'b533fb1f9ed8425badd141726240409';  // Replace with your WeatherAPI key
const IRAQ_CITIES = ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf', 'Karbala'];

const getWeatherIcon = (code) => {
  if (code.includes("rain")) return <WiRain />;
  if (code.includes("cloud")) return <WiCloudy />;
  if (code.includes("snow")) return <WiSnow />;
  if (code.includes("dust")) return <WiDust />;
  return <WiDaySunny />;
};

function IraqWeatherForecast() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const requests = IRAQ_CITIES.map(city =>
          axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1`)
        );
        const responses = await Promise.all(requests);
        const data = responses.map(response => response.data);
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 3 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="loading">Loading weather forecast...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="iraq-weather-forecast">
      <h2 className="section-title">Iraq Weather Forecast</h2>
      <div className="weather-grid">
        {weatherData.map((cityData, index) => (
          <div key={index} className="city-weather-card">
            <h3 className="city-name">{cityData.location.name}</h3>
            <div className="current-weather">
              <div className="weather-icon">
                {getWeatherIcon(cityData.current.condition.text.toLowerCase())}
              </div>
              <div className="temperature">
                {Math.round(cityData.current.temp_c)}°C
              </div>
              <div className="weather-description">
                {cityData.current.condition.text}
              </div>
            </div>
            <div className="forecast">
              {cityData.forecast.forecastday[0].hour.slice(0, 4).map((forecast, idx) => (
                <div key={idx} className="forecast-item">
                  <div className="forecast-time">
                    {new Date(forecast.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="forecast-icon">
                    {getWeatherIcon(forecast.condition.text.toLowerCase())}
                  </div>
                  <div className="forecast-temp">
                    {Math.round(forecast.temp_c)}°C
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default IraqWeatherForecast;
