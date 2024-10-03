'use client';

import React, { useState } from 'react';
import GeoWeather from '@/components/GeoWeather';
import UVIndex from '@/components/UVIndex';
import AirQualityDisplay from '@/components/AirQualityDisplay';
import AirQualityIndex from '@/components/AirQualityIndex';
import Modal from '@/components/Modal';
import ForecastComponent from '@/components/Forecast';
import Humidity from '@/components/Humidity';
import Precipitation from '@/components/Precipitation';
import Temperature from '@/components/Temperature';
import AlienActivity from '@/components/AlienActivity';
import { WeatherData } from '@/lib/types';
import { Search } from 'lucide-react';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleWeatherDataFetched = (data: WeatherData) => {
    console.log('Received data:', data);
    setWeatherData(data);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setWeatherData(null);
  };

  const handleAirQualityClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleManualLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(manualLocation)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      const data = await response.json();
      handleWeatherDataFetched(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      handleError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      <GeoWeather onWeatherFetched={handleWeatherDataFetched} onError={handleError} />

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {!weatherData && (
        <form onSubmit={handleManualLocationSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            placeholder="Enter location (e.g., city or zip code)"
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            <Search size={24} />
          </button>
        </form>
      )}

      {weatherData && (
        <>
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Current Weather in {weatherData.location.name}</h1>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">{weatherData.current.temp_c}°C</p>
                <p className="text-xl">{weatherData.current.condition.text}</p>
              </div>
              <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} className="w-24 h-24" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Temperature weatherData={weatherData} />
            <Precipitation weatherData={weatherData} />
            <Humidity weatherData={weatherData} />
            <UVIndex weatherData={weatherData} />
            <AirQualityIndex airQuality={weatherData.current.air_quality} onClick={handleAirQualityClick} />
            <AlienActivity moonPhase={weatherData.forecast.forecastday[0].astro.moon_phase} />
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