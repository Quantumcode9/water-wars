import React from "react";
import { WeatherData } from "@/lib/types"; 
import { Wind } from 'lucide-react';



interface WindDisplayProps {
    weatherData?: WeatherData | null;
}

const WindDisplay: React.FC<WindDisplayProps> = ({ weatherData }) => {
    console.log(weatherData); 

if (!weatherData) {
    return <div>Loading...</div>;
    }

const wind_mph = weatherData.current.wind_mph;

const wind_degree = weatherData.current.wind_degree;
const wind_dir = weatherData.current.wind_dir;
const gust_mph = weatherData.current.gust_mph;


return (
    <div className="bg-surface hover:shadow-lg rounded-lg shadow-md p-4 md:p-6 cursor-arrow overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg md:text-xl font-semibold">Wind</h2>
    <Wind className="w-6 h-6 text-gray-400" />
  </div>

  {/* Content Grid */}
  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-center">
    {/* Wind Details */}
    <div className="flex flex-col">
      <p className="text-sm md:text-base text-gray-500">Wind</p>
      <p className="text-base md:text-xl font-bold">{wind_mph} mph</p>
    </div>

    {/* Direction */}
    <div className="flex flex-col">
      <p className="text-sm md:text-base text-gray-500">Direction</p>
      <p className="text-base md:text-xl font-bold">
        {wind_degree}° {wind_dir}
      </p>
    </div>

    {/* Gusts */}
    <div className="flex flex-col">
      <p className="text-sm md:text-base text-gray-500">Gusts</p>
      <p className="text-base md:text-xl font-bold">{gust_mph} mph</p>
    </div>



        {/* Compass */}
        <div className=" md:col-span-1 flex justify-center items-center">
        <div className="relative w-32 h-32">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
            {/* Compass Circle */}
            <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="5"
            />
            {/* Cardinal Directions */}
            <text x="50" y="15" textAnchor="middle" fill="white" fontSize="6">
                N
            </text>
            <text x="50" y="90" textAnchor="middle" fill="white" fontSize="6">
                S
            </text>
            <text x="10" y="55" textAnchor="middle" fill="white" fontSize="6">
                W
            </text>
            <text x="90" y="55" textAnchor="middle" fill="white" fontSize="6">
                E
            </text>

            {/* Wind Direction Indicator */}
            <line
                x1="50"
                y1="50"
                x2={50 + 40 * Math.cos((wind_degree - 90) * (Math.PI / 180))}
                y2={50 + 40 * Math.sin((wind_degree - 90) * (Math.PI / 180))}
                stroke="white"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
            />
            <defs>
                <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
                >
                <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                </marker>
            </defs>
            </svg>

            {/* Center Speed Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-bold">{wind_mph}</p>
            <p className="text-sm">mph</p>
            </div>
        </div>
        </div>

    </div>
    </div>
);
};

export default WindDisplay;