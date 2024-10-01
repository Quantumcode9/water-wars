'use client';

import React, { useState } from 'react';
import {
Thermometer,
ThermometerSnowflake,
ThermometerSun,
Wind,
Sun,
Moon,
} from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

const Dashboard = () => {
const [location, setLocation] = useState('');

// TODO: Replace with actual API calls and data processing
const temperatureData = {
    currentTemp: '22°C',
    feelsLike: '21°C',
    tempMin: '18°C',
    tempMax: '26°C',
    pressure: '1015 hpa',
    humidity: '60%',
    sunrise: '6:30 AM',
    sunset: '7:45 PM',
    windSpeed: '5 mps',
};

return (
    <div className="space-y-6">
    <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Temperature Details</h1>
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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
        title="Current Temperature"
        value={temperatureData.currentTemp}
        icon={Thermometer}
        recommendation="Dress accordingly."
        />
        <DashboardCard
        title="Feels Like"
        value={temperatureData.feelsLike}
        icon={ThermometerSun}
        recommendation="Feels like temperature outside."
        />
        <DashboardCard
        title="Minimum Temperature"
        value={temperatureData.tempMin}
        icon={ThermometerSnowflake}
        recommendation="Lowest temperature today."
        />
        <DashboardCard
        title="Maximum Temperature"
        value={temperatureData.tempMax}
        icon={ThermometerSun}
        recommendation="Highest temperature today."
        />
        <DashboardCard
        title="Humidity"
        value={temperatureData.humidity}
        icon={Wind}
        recommendation="Humidity levels."
        />
        <DashboardCard
        title="Pressure"
        value={temperatureData.pressure}
        icon={Wind}
        recommendation="Atmospheric pressure."
        />
        <DashboardCard
        title="Wind Speed"
        value={temperatureData.windSpeed}
        icon={Wind}
        recommendation="Wind conditions."
        />
        <DashboardCard
        title="Sunrise"
        value={temperatureData.sunrise}
        icon={Sun}
        recommendation="Sunrise time."
        />
        <DashboardCard
        title="Sunset"
        value={temperatureData.sunset}
        icon={Moon}
        recommendation="Sunset time."
        />
    </div>
    </div>
);
};

export default Dashboard;