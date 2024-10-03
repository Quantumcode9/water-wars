'use client';

import React, { useEffect } from 'react';
import { WeatherData } from '@/lib/types';

interface GeoWeatherProps {
  onWeatherFetched: (data: WeatherData) => void;
  onError: (error: string) => void;
}

const GeoWeather: React.FC<GeoWeatherProps> = ({ onWeatherFetched, onError }) => {
  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(`/api/weather?city=${latitude},${longitude}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch weather data');
        }

        const data = await response.json();
        console.log('GeoWeather Component Data:', data);
        onWeatherFetched(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        onError('Failed to fetch location data. Please enter a location manually.');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          onError('Failed to get your location. Please enter a location manually.');
        }
      );
    } else {
      onError('Geolocation is not supported by your browser. Please enter a location manually.');
    }
  }, [onWeatherFetched, onError]);

  return null;
};

export default GeoWeather;