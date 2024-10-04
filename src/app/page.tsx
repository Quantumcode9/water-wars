'use client';

import React, { useState, useEffect, useContext } from 'react';
import { WeatherDataContext } from '@/context/WeatherDataContext';
import UVIndex from '@/components/UVIndex';
import AirQualityDisplay from '@/components/AirQualityDisplay';
import AirQualityIndex from '@/components/AirQualityIndex';
import Modal from '@/components/Modal';
import ForecastComponent from '@/components/Forecast';
import Humidity from '@/components/Humidity';
import Precipitation from '@/components/Precipitation';
import Temperature from '@/components/Temperature';
import AlienActivity from '@/components/AlienActivity';
import { WeatherData, ForecastDay } from '@/lib/types';
import { Search } from 'lucide-react';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { weatherData, setWeatherData } = useContext(WeatherDataContext);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchWeatherData = async (location: string) => {
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(location)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
      setError(null);

      localStorage.setItem('weatherData', JSON.stringify(data));

      // Prepare visualization data and store it in localStorage
      const visualizationData = {
        location: data.location,
        current: data.current,
        forecast: data.forecast.forecastday.map((day: ForecastDay) => ({
          date: day.date,
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          avgTemp: day.day.avgtemp_c,
          totalPrecip: day.day.totalprecip_mm,
          uv: day.day.uv,
          moonPhase: day.astro.moon_phase,
        })),
      };
      localStorage.setItem('weatherVisualizationData', JSON.stringify(visualizationData));

      // Store location data in localStorage
      const locationData = {
        state: data.location.region,
        county: data.location.name,
      };
      localStorage.setItem('userLocation', JSON.stringify(locationData));

      // Store alert data in localStorage
      if (data.alerts && data.alerts.alert) {
        localStorage.setItem('weatherAlerts', JSON.stringify(data.alerts.alert));
      } else {
        localStorage.removeItem('weatherAlerts');
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
      localStorage.removeItem('weatherData');
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('weatherData');
    if (storedData) {
      setWeatherData(JSON.parse(storedData));
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(`${latitude},${longitude}`);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError('Failed to get your location. Please enter a location manually.');
          }
        );
      } else {
        setError('Geolocation is not supported by your browser. Please enter a location manually.');
      }
    }
  }, []);

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation) {
      fetchWeatherData(manualLocation);
    }
  };

  const handleAirQualityClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isClient) {
    return null; 
  }

  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleManualLocationSubmit} className="flex items-center space-x-2 dark:text-black">
        <input
          type="text"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
          placeholder="Enter location (e.g., city or zip code)"
          className="flex-grow px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="bg-button text-white p-2 rounded-lg">
          <Search size={24} />
        </button>
      </form>

      {weatherData && (
        <>
          <div className="bg-accent shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              Current Weather in {weatherData.location.name}
            </h1>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">{weatherData.current.temp_f}°F</p>
                <p className="text-xl">{weatherData.current.condition.text}</p>
              </div>
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
                className="w-24 h-24"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Temperature weatherData={weatherData} />
            <Precipitation weatherData={weatherData} />
            <Humidity weatherData={weatherData} />
            <UVIndex weatherData={weatherData} />
            <AirQualityIndex
              airQuality={weatherData.current.air_quality}
              onClick={handleAirQualityClick}
            />
            <AlienActivity
              moonPhase={weatherData.forecast.forecastday[0].astro.moon_phase}
            />
          </div>

          <ForecastComponent forecastData={weatherData.forecast} />
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AirQualityDisplay airQuality={weatherData?.current.air_quality || null} />
      </Modal>
    </div>
  );
};

export default Dashboard;