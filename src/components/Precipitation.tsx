import React from 'react';
import { CloudRain } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { WeatherData } from '@/lib/types';

interface PrecipitationProps {
  weatherData: WeatherData | null;
}

const getPrecipitationCategory = (precipitation: number) => {
  if (precipitation <= 0.10) {
    return {
      category: 'Light',
      color: 'text-green-500',
      recommendation: 'Just a teeny amount of rain. It might have even just been a leaky AC unit.',
    };
  } else if (precipitation <= 0.30) {
    return {
      category: 'Moderate',
      color: 'text-yellow-500',
      recommendation: 'A lovely serene gloom - perfect for ASMR.',
    };
  } else if (precipitation <= 1.50) {
    return {
      category: 'Heavy',
      color: 'text-orange-500',
      recommendation: 'Share an umbrella with a friend and be cute together. Go on.',
    };
  } else if (precipitation <= 30) {
    return {
      category: 'Very Heavy',
      color: 'text-red-500',
      recommendation: 'Wow, the rain really exposes the worst of our driving skills.',
    };
  } else {
    return {
      category: 'Extreme',
      color: 'text-red-900',
      recommendation: 'Sooo hurricanes are not nearly as nice as their names.',
    };
  }
};

const Precipitation: React.FC<PrecipitationProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const precipitation = weatherData.current.precip_in;
  const { category, color, recommendation } = getPrecipitationCategory(precipitation);

  return (
    <DashboardCard
      title="Precipitation"
      value={
        <div className="flex items-center justify-between space-x-4">
          <span className={`text-xl md:text-2xl font-bold ${color}`}>{precipitation}</span>
          <div className="text-sm md:text-base text-gray-500 mt-1">{category}</div>
        </div>
      }
      icon={CloudRain}
      recommendation={recommendation}
    />
  );
};

export default Precipitation;