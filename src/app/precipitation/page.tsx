'use client';

import React, { useState } from 'react';
import {
Umbrella,
CloudRain,
CloudSnow,
CloudDrizzle,
Droplet,
CloudLightning,
} from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

const Dashboard = () => {
const [location, setLocation] = useState('');

// TODO: Replace with actual API calls and data processing
const precipitationData = {
    probability: '80%',
    intensity: 'Very High',
    type: 'Rain',
    amount: '5 mm',
    humidity: '85%',
    dewPoint: '18°C',
    cloudCover: '75%',
};

return (
    <div className="space-y-6">
    <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Precipitation Details</h1>
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
        title="Precipitation Probability"
        value={precipitationData.probability}
        icon={Umbrella}
        recommendation="High chance of precipitation."
        />
        <DashboardCard
        title="Intensity"
        value={precipitationData.intensity}
        icon={CloudRain}
        recommendation="Expect moderate rainfall."
        />
        <DashboardCard
        title="Type"
        value={precipitationData.type}
        icon={
            precipitationData.type === 'Rain'
            ? CloudRain
            : precipitationData.type === 'Snow'
            ? CloudSnow
            : CloudDrizzle
        }
        recommendation={`It's going to ${precipitationData.type.toLowerCase()} today.`}
        />
        <DashboardCard
        title="Expected Amount"
        value={precipitationData.amount}
        icon={Droplet}
        recommendation="Carry an umbrella just in case."
        />
        <DashboardCard
        title="Humidity"
        value={precipitationData.humidity}
        icon={CloudDrizzle}
        recommendation="It might feel muggy outside."
        />
        <DashboardCard
        title="Dew Point"
        value={precipitationData.dewPoint}
        icon={Droplet}
        recommendation="Comfort level is moderate."
        />
        <DashboardCard
        title="Cloud Cover"
        value={precipitationData.cloudCover}
        icon={CloudLightning}
        recommendation="Cloudy skies expected."
        />
    </div>
    </div>
);
};

export default Dashboard;