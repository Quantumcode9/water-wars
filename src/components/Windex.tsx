import React from "react";
import { WeatherData } from "@/lib/types"; 
import { Wind } from 'lucide-react';
import { useTemperatureUnit } from '@/context/TemperatureUnitContext';

interface WindDisplayProps {
    weatherData?: WeatherData | null;
}

const WindDisplay: React.FC<WindDisplayProps> = ({ weatherData }) => {
    const { isFahrenheit } = useTemperatureUnit();

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const windDirectionMap: { [key: string]: string } = {
        N: "N",
        NNE: "N",
        NE: "NE",
        ENE: "E",
        E: "E",
        ESE: "E",
        SE: "SE",
        SSE: "S",
        S: "S",
        SSW: "SW",
        SW: "SW",
        WSW: "W",
        W: "W",
        WNW: "W",
        NW: "NW",
        NNW: "N",
    };

    const simpleWindDir = windDirectionMap[weatherData.current.wind_dir] || weatherData.current.wind_dir;
    const wind_mph = Math.round(weatherData.current.wind_mph);
    const wind_kph = Math.round(weatherData.current.wind_kph);
    const wind_degree = weatherData.current.wind_degree;
    const gust_mph = Math.round(weatherData.current.gust_mph);
    const gust_kph = Math.round(weatherData.current.gust_kph);

    return (
        <div className="bg-surface hover:shadow-lg rounded-lg shadow-md p-3 md:p-4 cursor-arrow mx-auto md:h-52 max-h-52">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide text-primary">Wind</h2>
                <Wind className="w-6 h-6 text-blue-600" />
            </div>

            <div className="flex flex-row items-center justify-between">
                {/* Left Column: Wind Details */}
                <div className="grid grid-cols-1 gap-y-4">
                    {/* Speeds */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Speeds</p>
                        <p className="text-sm text-textSecondary"> {isFahrenheit ? `${wind_mph} mph` : `${wind_kph} kph`}</p>
                    </div>
                    {/* Gusts */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Gusts</p>
                        <p className="text-sm text-textSecondary"> {isFahrenheit ? `${gust_mph} mph` : `${gust_kph} kph`}</p>
                    </div>
                    {/* Direction */}
                    <div className="flex justify-between gap-2 items-center">
                        <p className="text-sm font-medium">Direction</p>
                        <p className="text-sm text-textSecondary">
                            {wind_degree}° {simpleWindDir}
                        </p>
                    </div>
                </div>

                {/* Right Column: Compass */}
                <div className="flex justify-center items-center flex-shrink-0 max-w-[8rem] max-h-[8rem] mr-2">
                    <div className="relative w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="-10 -10 120 120">
                        <circle cx="50" cy="50" r="45" fill="none" className="stroke-gray-300 dark:stroke-[rgba(255,255,255,0.3)]" strokeWidth="4" />
                        
                        {/* Cardinal Directions */}
                        <text x="50" y="10" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="12">N</text>
                        <text x="50" y="100" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="12">S</text>
                        <text x="5" y="55" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="12">W</text>
                        <text x="95" y="55" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="12">E</text>

                        <defs>
                            {/* Arrowhead marker*/}
                            <marker 
                            id="arrowhead" 
                            markerWidth="10" 
                            markerHeight="7" 
                            refX="5" 
                            refY="3.5" 
                            orient="auto"
                            >
                            <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-500 dark:fill-white" />
                            </marker>

                            {/* Circle marker */}
                            <marker 
                            id="circle" 
                            markerWidth="4" 
                            markerHeight="4" 
                            refX="2" 
                            refY="2" 
                            orient="auto"
                            >
                            <circle cx="2" cy="2" r="2" className="fill-gray-400 dark:fill-gray-100 stroke-gray-300 dark:stroke-gray-300/30" />
                            </marker>
                        </defs>

                        {/* Line indicating where the wind is going (arrow) */}
                        <line
                            x1="50"
                            y1="50"
                            x2={50 + 40 * Math.cos((wind_degree + 90) * (Math.PI / 180))}
                            y2={50 + 40 * Math.sin((wind_degree + 90) * (Math.PI / 180))}
                            className="stroke-gray-400"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                        />
                        <line
                            x1="50"
                            y1="50"
                            x2={50 + 40 * Math.cos((wind_degree - 90) * (Math.PI / 180))}
                            y2={50 + 40 * Math.sin((wind_degree - 90) * (Math.PI / 180))}
                            className="stroke-gray-400"
                            strokeWidth="2"
                            markerEnd="url(#circle)"
                        />
                        </svg>
                        {/* Center Speed */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-lg font-bold">
                                {isFahrenheit ? `${wind_mph} mph` : `${wind_kph} kph`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindDisplay;