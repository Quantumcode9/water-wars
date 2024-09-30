'use client';

import React, { useState } from 'react';
import { Sun, Umbrella, Thermometer, Radio } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

const Dashboard = () => {
  const [location, setLocation] = useState('');

  // TODO: Replace with actual API calls and data processing
  const weatherData = {
    temperature: '22°C',
    precipitation: '30%',
    uv: '6 (High)',
    astrological: 'Mercury in retrograde'
  };

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Temperature"
          value={weatherData.temperature}
          icon={Thermometer}
          recommendation="It's a pleasant day!"
        />
        <DashboardCard
          title="Precipitation"
          value={weatherData.precipitation}
          icon={Umbrella}
          recommendation="You might want to bring an umbrella."
        />
        <DashboardCard
          title="UV Index"
          value={weatherData.uv}
          icon={Sun}
          recommendation="Don't forget your sunscreen!"
        />
        <DashboardCard
          title="Astrological Forecast"
          value={weatherData.astrological}
          icon={Radio}
          recommendation="Consider wearing a tinfoil hat today."
        />
      </div>
    </div>
  );
};

export default Dashboard;