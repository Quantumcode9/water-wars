'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData } from '@/lib/types';

interface WeatherDataContextType {
weatherData: WeatherData | null;
setWeatherData: (data: WeatherData | null) => void;
}

export const WeatherDataContext = createContext<WeatherDataContextType>({
weatherData: null,
setWeatherData: () => {},
});

export const WeatherDataProvider = ({ children }: { children: ReactNode }) => {
const [weatherData, setWeatherData] = useState<WeatherData | null>(() => {
    if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('weatherData');
    const storedTimestamp = localStorage.getItem('weatherDataTimestamp');

    if (storedData && storedTimestamp) {
        const timestamp = parseInt(storedTimestamp, 10);
        const now = Date.now();

        // Check if data is older than 2 hours (7200000 ms)
        if (now - timestamp < 7200000) {
        return JSON.parse(storedData);
        } else {
        // Data is stale, remove it
        localStorage.removeItem('weatherData');
        localStorage.removeItem('weatherDataTimestamp');
        }
    }
    }
    return null;
});

useEffect(() => {
    if (weatherData) {
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
    localStorage.setItem('weatherDataTimestamp', Date.now().toString());
    } else {
    localStorage.removeItem('weatherData');
    localStorage.removeItem('weatherDataTimestamp');
    }
}, [weatherData]);

return (
    <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
    {children}
    </WeatherDataContext.Provider>
);
};