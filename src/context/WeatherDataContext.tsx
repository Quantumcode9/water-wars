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
    return storedData ? JSON.parse(storedData) : null;
    }
    return null;
});

useEffect(() => {
    if (weatherData) {
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
    } else {
    localStorage.removeItem('weatherData');
    }
}, [weatherData]);

return (
    <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
    {children}
    </WeatherDataContext.Provider>
);
};