'use client';

import React, { useState } from 'react';
import { WeatherData } from '@/lib/types';
import AlertsModal from './AlertsModal';
import ForecastComponent from './Forecast';

interface WeatherProps {
onDataFetched: (data: WeatherData) => void;
}

const Weather: React.FC<WeatherProps> = ({ onDataFetched }) => {
const [city, setCity] = useState('');
const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
const [showAlerts, setShowAlerts] = useState(false);

const fetchWeatherData = async () => {
    if (!city) {
    setError('Please enter a location');
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

    if (
        data.alerts &&
        data.alerts.alert &&
        data.alerts.alert.length > 0
    ) {
        setShowAlerts(true);
    }
    } catch (err) {
    console.error('Error fetching weather data:', err);
    setError('An error occurred while fetching data');
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="flex flex-col items-center justify-center p-8 max-w-100 mx-auto">
    {weatherData && showAlerts && weatherData.alerts && weatherData.alerts.alert.length > 0 && (
    <AlertsModal
        alerts={weatherData.alerts.alert}
        onClose={() => setShowAlerts(false)}
    />
    )}
    <h1 className="text-2xl text-center font-bold mb-4">Weather Updates</h1>
    <div className="mb-4 flex flex-col items-center">
    <input
        type="text"
        placeholder="Enter your location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 text-lg border rounded w-full"
    />
    <button
        onClick={fetchWeatherData}
        disabled={isLoading}
        className="p-2 text-lg mt-2 bg-blue-500 text-white hover:bg-blue-400 rounded disabled:opacity-50"
    >
        {isLoading ? 'Loading...' : 'Get Weather'}
    </button>
    </div>
    <hr className="w-full" />
    {error && <p className="text-red-500 text-center">{error}</p>}
    {isLoading && <p>Loading...</p>}
    {weatherData && (
        <div className="mt-4">
        <h2 className="text-xl font-semibold">
            {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
        </h2>
        <p className="mt-2">
            <strong>Temperature:</strong> {weatherData.current.temp_c}°C ({weatherData.current.temp_f}°F)
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
            <strong>Wind:</strong> {weatherData.current.wind_kph} kph ({weatherData.current.wind_mph} mph) {weatherData.current.wind_dir}
        </p>

        </div>
    )}
    </div>
);
};

export default Weather;