'use client';

import React, { useEffect, useState } from 'react';

interface WeatherData {
  location: {
    city: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
  };
  weather: {
    current: {
      temp_c: number;
      temp_f: number;
      condition: {
        text: string;
        icon: string;
      };
      wind_kph: number;
      humidity: number;
      feelslike_c: number;
      feelslike_f: number;  // Added this line
    };
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
  };
}

const GeoWeather: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/geoweather');

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch weather data');
          return;
        }

        const data = await response.json();
        console.log('Weather Component Data:', data);
        setData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('An error occurred while fetching data');
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const { city, region, country } = data.location;
  const { temp_f, temp_c, condition, wind_kph, humidity, feelslike_f, feelslike_c } =
    data.weather.current;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Current Weather</h1>
      <h2 className="text-xl font-semibold">
        {city}, {region}{country && ` , ${country}`}
      </h2>
      <div className="mt-4 flex items-center">
        <img src={condition.icon} alt={condition.text} />
        <div className="ml-4">
          <p className="text-3xl font-bold">{temp_f}°F</p>
          <p className="text-sm font-light">{temp_c}°C</p>
          <p className="text-lg">{condition.text}</p>
          <p>Feels like: {feelslike_f}°F ({feelslike_c}°C)</p>
          <p>Wind: {wind_kph} kph</p>
          <p>Humidity: {humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default GeoWeather;