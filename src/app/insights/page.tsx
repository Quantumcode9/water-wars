'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WeatherData {
  location: {
    name: string;
    region: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    uv: number;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    avgTemp: number;
    totalPrecip: number;
    uv: number;
    moonPhase: string;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const getAlienActivity = (moonPhase: string) => {
  switch (moonPhase) {
    case 'New Moon': return 'Aliens on vacation';
    case 'Waxing Crescent': return 'Alien scouts arriving';
    case 'First Quarter': return 'Alien tourist season';
    case 'Waxing Gibbous': return 'Alien rave party';
    case 'Full Moon': return 'Full-scale alien invasion';
    case 'Waning Gibbous': return 'Aliens nursing hangovers';
    case 'Last Quarter': return 'Alien peace negotiations';
    case 'Waning Crescent': return 'Aliens packing up';
    default: return 'Aliens confused by Earth calendars';
  }
};

const InsightsPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('weatherVisualizationData');
    if (storedData) {
      setWeatherData(JSON.parse(storedData));
    }
  }, []);

  if (!weatherData) {
    return <p>Loading weather insights...</p>;
  }

  const temperatureData = weatherData.forecast.map(day => ({
    date: day.date,
    max: day.maxTemp,
    min: day.minTemp,
    avg: day.avgTemp,
  }));

  const precipData = weatherData.forecast.map(day => ({
    date: day.date,
    precipitation: day.totalPrecip,
  }));

  const alienActivityData = weatherData.forecast.map(day => ({
    date: day.date,
    activity: getAlienActivity(day.moonPhase),
  }));

  const uvData = [
    { name: 'Safe', value: Math.max(0, 3 - weatherData.current.uv) },
    { name: 'Moderate', value: Math.max(0, Math.min(weatherData.current.uv - 3, 2)) },
    { name: 'High', value: Math.max(0, Math.min(weatherData.current.uv - 5, 2)) },
    { name: 'Very High', value: Math.max(0, Math.min(weatherData.current.uv - 7, 3)) },
    { name: 'Extreme', value: Math.max(0, weatherData.current.uv - 10) },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Weather Insights for {weatherData.location.name}, {weatherData.location.region}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Temperature Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="max" stroke="#FF4136" name="Max Temp (°C)" />
              <Line type="monotone" dataKey="min" stroke="#0074D9" name="Min Temp (°C)" />
              <Line type="monotone" dataKey="avg" stroke="#2ECC40" name="Avg Temp (°C)" />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-600">Tip: On the hottest day, pretend you&apos;re a popsicle to stay cool!</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Precipitation Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={precipData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="precipitation" fill="#3D9970" name="Precipitation (mm)" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-600">Remember: Rain is just the sky&apos;s way of watering your garden... and your enthusiasm.</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">UV Index Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={uvData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {uvData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-600">Current UV Index: {weatherData.current.uv}. Alien sunscreen recommended for indices over 9000.</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Alien Activity Forecast</h2>
          <ul className="list-disc pl-5">
            {alienActivityData.map((day, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{day.date}:</span> {day.activity}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-600">Disclaimer: Alien activities are purely speculative and not endorsed by any intergalactic authority.</p>
        </div>
      </div>

      <button onClick={() => router.push('/')} className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg">
        Return to Dashboard
      </button>
    </div>
  );
};

export default InsightsPage;