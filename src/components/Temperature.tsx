import React from 'react';
import { Thermometer } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { WeatherData } from '@/lib/types';
import { useTemperatureUnit } from '@/context/TemperatureUnitContext';

interface TemperatureProps {
  weatherData: WeatherData | null;
}

const getTemperatureCategory = (temperature: number, isFahrenheit: boolean) => {
  const tempF = isFahrenheit ? temperature : (temperature * 9) / 5 + 32;

  if (tempF <= 50) {
    return {
      category: 'Cold',
      color: 'text-blue-500',
      recommendation: "I can't feel my toes. I hope they're still attached.",
    };
  } else if (tempF <= 68) {
    return {
      category: 'Mild',
      color: 'text-yellow-500',
      recommendation: "Let's go frolic amongst the flowers! What a perfect day!",
    };
  } else if (tempF <= 86) {
    return {
      category: 'Warm',
      color: 'text-orange-500',
      recommendation: 'The beach is the only suitable place to be right now.',
    };
  } else if (tempF <= 104) {
    return {
      category: 'Hot',
      color: 'text-red-500',
      recommendation: "Oh god my clothes are sticking to me – it's too hot.",
    };
  } else if (tempF <= 122) {
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
  const { isFahrenheit } = useTemperatureUnit(); 

  if (!weatherData) {
    return null;
  }

  // Get temperature in the desired unit
  const temperature = isFahrenheit
    ? weatherData.current.temp_f
    : weatherData.current.temp_c;

  // Adjust the temperature category based on the unit
  const { category, color, recommendation } = getTemperatureCategory(temperature, isFahrenheit);

  return (
    <DashboardCard
      title="Temperature"
      value={
        <div className="flex items-center justify-between space-x-4">
        <span className={`text-xl md:text-2xl font-bold ${color}`}>
          {`${temperature.toFixed(1)}°${isFahrenheit ? 'F' : 'C'}`}</span>
          <div className={`text-sm md:text-base text-gray-500 mt-1`}>{category}</div>
        </div>
      }
      icon={Thermometer}
      recommendation={recommendation}
    />
  );
};

export default Temperature;

