'use client';

import React, { useState } from 'react';

interface WeatherData {
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
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
};
}

interface WeatherProps {
    onDataFetched: (data: WeatherData) => void;
  }

  const Weather: React.FC<WeatherProps> = ({ onDataFetched }) => {
const [city, setCity] = useState('');
const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

const fetchWeatherData = async () => {
    if (!city) {
    setError('Please enter a city name');
    return;
    }

    setIsLoading(true);
    setError('');
    setWeatherData(null);

    try {
    const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch weather data');
        return;
    }

    const data: WeatherData = await response.json();
    console.log('Fetched weather data:', data); 
    setWeatherData(data);
    onDataFetched(data);
    
    } catch (err) {
    console.error('Error fetching weather data:', err);
    setError('An error occurred while fetching data');
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="p-8 max-w-lg mx-auto">
    <h1 className="text-2xl font-bold mb-4">Weather Updates</h1>
    <div className="mb-4">
        <input
        type="text"
        placeholder="Enter your location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 text-lg border rounded w-48"
        />
        <button
        onClick={fetchWeatherData}
        disabled={isLoading}
        className="p-2 text-lg ml-2 bg-blue-500 text-white hover:bg-blue-400 rounded disabled:opacity-50"
        >
        {isLoading ? 'Loading...' : 'Get Weather'}
        </button>
    </div>
    <hr />
    {error && <p className="text-red-500">{error}</p>}
    {isLoading && <p>Loading...</p>}
    {weatherData && (
        <div className="mt-4">
        <h2 className="text-xl font-semibold">
            {weatherData.location.name}, {weatherData.location.region},{' '}
            {weatherData.location.country}
        </h2>
        <p className="mt-2">
            <strong>Temperature:</strong> {weatherData.current.temp_c}°C (
            {weatherData.current.temp_f}°F)
        </p>
        <p>
            <strong>Condition:</strong> {weatherData.current.condition.text}
        </p>
        <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
            className="mt-2"
        />
        <p>
            <strong>Humidity:</strong> {weatherData.current.humidity}%
        </p>
        <p>
            <strong>Wind:</strong> {weatherData.current.wind_kph} kph (
            {weatherData.current.wind_mph} mph) {weatherData.current.wind_dir}
        </p>
        {/* Can add more weather details here*/}
        </div>
    )}
    </div>
);
};

export default Weather;