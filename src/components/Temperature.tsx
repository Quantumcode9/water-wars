import React from 'react';
import { Thermometer } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { WeatherData } from '@/lib/types';

interface TemperatureProps {
  weatherData: WeatherData | null;
}

const getTemperatureCategory = (temperatureC: number) => {
  if (temperatureC <= 10) {
    return {
      category: 'Cold',
      color: 'text-blue-500',
      recommendation: "I can't feel my toes. I hope they're still attached.",
    };
  } else if (temperatureC <= 20) {
    return {
      category: 'Mild',
      color: 'text-yellow-500',
      recommendation: "Let's go frolic amongst the flowers! What a perfect day!",
    };
  } else if (temperatureC <= 30) {
    return {
      category: 'Warm',
      color: 'text-orange-500',
      recommendation: 'The beach is the only suitable place to be right now.',
    };
  } else if (temperatureC <= 40) {
    return {
      category: 'Hot',
      color: 'text-red-500',
      recommendation: "Oh god my clothes are sticking to me – it's too hot.",
    };
  } else if (temperatureC <= 50) {
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

const Temperature: React.FC<TemperatureProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const temperatureC = weatherData.current.temp_c;
  const { category, color, recommendation } = getTemperatureCategory(temperatureC);

  return (
    <DashboardCard
      title="Temperature"
      value={<span className={color}>{`${temperatureC}°C | ${category}`}</span>}
      icon={Thermometer}
      recommendation={recommendation}
    />
  );
};

export default Temperature;