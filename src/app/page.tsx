'use client';

import React, { useState } from 'react';
import { Umbrella, Thermometer, Radio } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
// import AirQuality from '@/components/AirQuality';
import Weather from '@/components/Weather';
import GeoWeather from '@/components/GeoWeather';
import UVIndex from '@/components/UVIndex';


interface weatherData {
  location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
  };
  current: {
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: {
      text: string;
      icon: string;
      code: number;
      };
      wind_mph: number;
      wind_kph: number;
      wind_degree: number;
      wind_dir: string;
      pressure_mb: number;
      pressure_in: number;
      precip_mm: number;
      precip_in: number;
      humidity: number;
      cloud: number;
      feelslike_c: number;
      feelslike_f: number;
      uv: number;
      gust_mph: number;
      gust_kph: number;
  };
  }


const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);

  const handleWeatherDataFetched = (data: weatherData) => {
    setWeatherData(data);
  };


  // // TODO: Replace with actual API calls and data processing
  // const weatherData = {
  //   temperature: '22°C',
  //   precipitation: '30%',
  //   uv: '6 (High)',
  //   astrological: 'Mercury in retrograde'
  // };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Weather Dashboard</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Get Weather
          </button>
        </div>
      </div>
      <GeoWeather />
      <Weather onDataFetched={handleWeatherDataFetched} />
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
        {/* <DashboardCard
          title="UV Index"
          value={
            weatherData ? `${weatherData.current.uv} (high)` : ''
          }
          icon={Sun}
          recommendation="Don't forget your sunscreen!"
        /> */}
        <UVIndex weatherData={weatherData} />
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