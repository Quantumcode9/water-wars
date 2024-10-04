'use client';

import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { WeatherDataContext } from '@/context/WeatherDataContext';
import { WeatherData, ForecastDay } from '@/lib/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const getAlienActivity = (moonPhase: string) => {
  switch (moonPhase) {
    case 'New Moon':
      return 'Aliens on vacation';
    case 'Waxing Crescent':
      return 'Alien scouts arriving';
    case 'First Quarter':
      return 'Alien tourist season';
    case 'Waxing Gibbous':
      return 'Alien rave party';
    case 'Full Moon':
      return 'Full-scale alien invasion';
    case 'Waning Gibbous':
      return 'Aliens nursing hangovers';
    case 'Last Quarter':
      return 'Alien peace negotiations';
    case 'Waning Crescent':
      return 'Aliens packing up';
    default:
      return 'Aliens confused by Earth calendars';
  }
};

const InsightsPage = () => {
  const { weatherData, setWeatherData } = useContext(WeatherDataContext);
  const [localWeatherData, setLocalWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!weatherData) {
      // Try to get data from localStorage as a backup
      const storedData = localStorage.getItem('weatherData');
      if (storedData) {
        const parsedData: WeatherData = JSON.parse(storedData);
        setWeatherData(parsedData);
        setLocalWeatherData(parsedData);
      }
    } else {
      setLocalWeatherData(weatherData);
    }
  }, [weatherData, setWeatherData]);

  if (!localWeatherData) {
    return <p>Loading weather insights...</p>;
  }

  // Prepare data for charts
  const temperatureData = localWeatherData.forecast.forecastday.map((day: ForecastDay) => ({
    date: day.date.split('-').slice(1).join('-'), 
    max: day.day.maxtemp_f,
    min: day.day.mintemp_f,
    avg: day.day.avgtemp_f,
  }));

  const precipData = localWeatherData.forecast.forecastday.map((day: ForecastDay) => ({
    date: day.date.split('-').slice(1).join('-'),
    precipitation: day.day.totalprecip_mm,
  }));

  const alienActivityData = localWeatherData.forecast.forecastday.map((day: ForecastDay) => ({
    date: day.date.split('-').slice(1).join('-'), 
    activity: getAlienActivity(day.astro.moon_phase),
  }));

  const currentUV = localWeatherData.current.uv;

  const uvData = [
    { name: 'Safe', value: Math.max(0, 3 - currentUV) },
    { name: 'Moderate', value: Math.max(0, Math.min(currentUV - 3, 2)) },
    { name: 'High', value: Math.max(0, Math.min(currentUV - 5, 2)) },
    { name: 'Very High', value: Math.max(0, Math.min(currentUV - 7, 3)) },
    { name: 'Extreme', value: Math.max(0, currentUV - 10) },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Weather Insights for {localWeatherData.location.name}, {localWeatherData.location.region}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Trends */}
        <div className="bg-accent p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Temperature Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="max" stroke="#FF4136" name="Max Temp (°F)" />
              <Line type="monotone" dataKey="min" stroke="#0074D9" name="Min Temp (°F)" />
              <Line type="monotone" dataKey="avg" stroke="#2ECC40" name="Avg Temp (°F)" />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Tip: On the hottest day, pretend you're a popsicle to stay cool!
          </p>
        </div>

        {/* Precipitation Forecast */}
        <div className="bg-accent p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Precipitation Forecast</h2>
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
          <p className="mt-2 text-sm text-gray-600 text-center">
            Remember: Rain is just the sky's way of watering your garden... and your enthusiasm.
          </p>
        </div>

        {/* UV Index Distribution */}
        <div className="bg-accent p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">UV Index Distribution</h2>
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
          <p className="mt-2 text-sm text-gray-600 text-center">
            Current UV Index: {currentUV}. Alien sunscreen recommended for indices over 9000.
          </p>
        </div>

        {/* Alien Activity Forecast */}
        <div className="bg-accent p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Alien Activity Forecast</h2>
          <ul className="list-disc pl-5">
            {alienActivityData.map((day, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{day.date}:</span> {day.activity}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Disclaimer: Alien activities are purely speculative and not endorsed by any
            intergalactic authority.
          </p>
        </div>
      </div>

    </div>
  );
};

export default InsightsPage;