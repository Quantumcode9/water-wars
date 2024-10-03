'use client';

import React from 'react';
import { WeatherData, ForecastDay, HourlyForecast as HourlyForecastType } from '@/lib/types';

interface HourlyForecastProps {
  forecastData: WeatherData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecastData }) => {
  const today: ForecastDay = forecastData.forecast.forecastday[0];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Condition</th>
              <th className="px-4 py-2">Temp (°C)</th>
              <th className="px-4 py-2">Chance of Rain</th>
            </tr>
          </thead>
          <tbody>
            {today.hour.map((hour: HourlyForecastType, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{hour.time.split(' ')[1]}</td>
                <td className="px-4 py-2 flex items-center">
                  <img src={hour.condition.icon} alt={hour.condition.text} className="mr-2" />
                  {hour.condition.text}
                </td>
                <td className="px-4 py-2">{hour.temp_c}°C</td>
                <td className="px-4 py-2">{hour.chance_of_rain}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HourlyForecast;