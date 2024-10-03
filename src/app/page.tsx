'use client';

import React, { useState } from 'react';
import { Umbrella, Thermometer, Radio } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
// import AirQuality from '@/components/AirQuality';
import Weather from '@/components/Weather';
import GeoWeather from '@/components/GeoWeather';
import UVIndex from '@/components/UVIndex';
import AirQualityDisplay from '@/components/AirQualityDispay';
import AirQualityIndex from '@/components/AirQualityIndex';
import Modal from '@/components/Modal';
import ForecastComponent from '@/components/Forecast';
import { WeatherData, AirQuality, Forecast, Alert } from '@/lib/types';



const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<Forecast | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWeatherDataFetched = (data: WeatherData) => {
    console.log('Received data:', data);
    console.log('Forecast data:', data.forecast);
    setWeatherData(data);
    setForecastData(data.forecast);
  };

  const handleAirQualityClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      <GeoWeather />
      <Weather onDataFetched={handleWeatherDataFetched} />
      {forecastData && (
          <ForecastComponent forecastData={forecastData} />
        )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Temperature"
          value={
            weatherData
              ? `${weatherData.current.temp_f}°F`
              : ''
          }
          icon={Thermometer}
          recommendation="It's a pleasant day!"
        />

        

        <DashboardCard
          title="Precipitation"
          value={
            weatherData
              ? `${weatherData.current.precip_mm} mm`
              : ''
          }
          icon={Umbrella}
          recommendation="You might want to bring an umbrella."
        />
        <UVIndex weatherData={weatherData} />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AirQualityDisplay airQuality={weatherData?.current.air_quality || null} />
      </Modal>
      <AirQualityIndex airQuality={weatherData?.current.air_quality || null} onClick={handleAirQualityClick} />

        <DashboardCard
          title="Humidity"
          value={
            weatherData ? `${weatherData.current.humidity}%` : ''
          }
          icon={Radio}
          recommendation="Stay hydrated!"
        />
      </div>
    </div>
  );
};

export default Dashboard;