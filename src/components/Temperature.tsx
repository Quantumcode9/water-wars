import React from 'react';
import { Thermometer } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { WeatherData } from '@/lib/types';

interface TemperatureFahrenheitProps {
  weatherData: WeatherData | null;
}

const getTemperatureCategory = (temperatureF: number) => {
  if (temperatureF <= 50) {
    return {
      category: 'Cold',
      color: 'text-blue-500',
      recommendation: "I can't feel my toes. I hope they're still attached.",
    };
  } else if (temperatureF <= 68) {
    return {
      category: 'Mild',
      color: 'text-yellow-500',
      recommendation: "Let's go frolic amongst the flowers! What a perfect day!",
    };
  } else if (temperatureF <= 86) {
    return {
      category: 'Warm',
      color: 'text-orange-500',
      recommendation: 'The beach is the only suitable place to be right now.',
    };
  } else if (temperatureF <= 104) {
    return {
      category: 'Hot',
      color: 'text-red-500',
      recommendation: "Oh god my clothes are sticking to me – it's too hot.",
    };
  } else if (temperatureF <= 122) {
    return {
      category: 'Very Hot',
      color: 'text-purple-500',
      recommendation: "If I eat popsicles non-stop, I'll survive.",
    };
  } else {
    return {
      category: 'Extreme',
      color: 'text-black',
      recommendation: 'The sun is my enemy.',
    };
  }
};

const TemperatureFahrenheit: React.FC<TemperatureFahrenheitProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const temperatureF = weatherData.current.temp_f;
  const { category, color, recommendation } = getTemperatureCategory(temperatureF);

  return (
    <DashboardCard
      title="Temperature"
      value={<span className={color}>{`${temperatureF.toFixed(1)}°F | ${category}`}</span>}
      icon={Thermometer}
      recommendation={recommendation}
    />
  );
};

export default TemperatureFahrenheit;