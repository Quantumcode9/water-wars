import React from 'react';
import { Droplets } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { WeatherData } from '@/lib/types';

interface HumidityProps {
  weatherData: WeatherData | null;
}

const getHumidityCategory = (humidity: number) => {
  if (humidity <= 40) {
    return {
      category: 'Low',
      color: 'text-green-500',
      recommendation: 'The air is dry, my eyes are dry, my allergies are my constant companion.',
    };
  } else if (humidity <= 60) {
    return {
      category: 'Moderate',
      color: 'text-yellow-500',
      recommendation: 'The air has just the perfect amount of moisture.',
    };
  } else {
    return {
      category: 'High',
      color: 'text-orange-500',
      recommendation: "Eurgh, I feel like I'm swimming through the air.",
    };
  }
};

const Humidity: React.FC<HumidityProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const humidity = weatherData.current.humidity;
  const { category, color, recommendation } = getHumidityCategory(humidity);

  return (
    <DashboardCard
      title="Humidity"
      value={
        <div className="flex items-center justify-between space-x-4">
          <span className={`text-xl md:text-2xl font-bold ${color}`}>{humidity}</span>
          <div className="text-sm md:text-base text-gray-500 mt-1">{category}</div>
        </div>
      }
      icon={Droplets}

      recommendation={recommendation}
    />
  );
};


export default Humidity;