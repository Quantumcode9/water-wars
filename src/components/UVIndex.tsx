import React from 'react';
import { Sun } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

interface WeatherData {
  current: {
    uv: number;
  };
}

interface UVIndexProps {
  weatherData: WeatherData | null;
}

const getUVIndexCategory = (uv: number) => {
  if (uv >= 11) {
    return {
      category: 'Extreme',
      color: 'text-red-700',
      recommendation: 'Avoid going outside.',
    };
  } else if (uv >= 8) {
    return {
      category: 'Very High',
      color: 'text-red-500',
      recommendation: 'Minimize sun exposure.',
    };
  } else if (uv >= 6) {
    return {
      category: 'High',
      color: 'text-orange-500',
      recommendation: 'Better bring some sunscreen.',
    };
  } else if (uv >= 3) {
    return {
      category: 'Moderate',
      color: 'text-yellow-500',
      recommendation: 'Bring some sunscreen, just in case.',
    };
  } else {
    return {
      category: 'Low',
      color: 'text-green-500',
      recommendation: 'You can safely enjoy being outside!',
    };
  }
};

const UVIndex: React.FC<UVIndexProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const uvIndex = weatherData.current.uv;
  const { category, color, recommendation } = getUVIndexCategory(uvIndex);

  return (
    <DashboardCard
      title="UV Index"
      value={<span className={color}>{`${uvIndex} | ${category}`}</span>}
      icon={Sun}
      recommendation={recommendation}
    />
  );
};

export default UVIndex;