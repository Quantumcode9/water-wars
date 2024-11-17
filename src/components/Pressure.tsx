import React from "react";
import { WeatherData } from "@/lib/types";

interface PressureProps {
weatherData?: WeatherData | null;
}

const Pressure: React.FC<PressureProps> = ({ weatherData }) => {
if (!weatherData) {
    return <div>Loading...</div>;
}

const pressureIn = weatherData.current.pressure_in;

// Normalized pressure range for inHg
const minPressure = 29.0; // Lower bound in inHg
const maxPressure = 31.0; // Upper bound in inHg

// Clamp the pressure value between min and max
const normalizedPressure = Math.min(Math.max(pressureIn, minPressure), maxPressure);

// Calculate the angle for the gauge indicator
// Map 29.0-31.0 range to -90° to 90°
const gaugeAngle =
    ((normalizedPressure - minPressure) / (maxPressure - minPressure)) * 180 - 180;

const gaugeColor =
pressureIn < 29.50
? "stroke-blue-500"
: pressureIn > 30.20
? "stroke-yellow-500"
: "stroke-green-500"
// Calculate endpoint coordinates for the needle
const needleLength = 35; // Length of the needle
const centerX = 50; // Center of the gauge
const centerY = 50; // Center of the gauge
const endX = centerX + needleLength * Math.cos((gaugeAngle * Math.PI) / 180);
const endY = centerY + needleLength * Math.sin((gaugeAngle * Math.PI) / 180);

return (
    <div className="bg-surface hover:shadow-lg rounded-lg shadow-md p-4 md:p-6 cursor-arrow mx-auto">
    <h2 className="text-lg font-semibold mb-4">Pressure</h2>
    <div className="relative h-40 mx-auto">
        {/* Gauge Background */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Main arc */}
        <path
            d="M 10,50 A 40,40 0 0 1 90,50"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
            strokeLinecap="round"
        />
        
        {/* Tick marks */}
        {Array.from({ length: 7 }).map((_, i) => {
            const angle = 180 + (i * 180) / 6; // Evenly spaced tick marks
            const tickLength = i % 2 === 0 ? 8 : 5; // Alternate tick lengths
            const x1 = centerX + (40 - tickLength) * Math.cos((angle * Math.PI) / 180);
            const y1 = centerY + (40 - tickLength) * Math.sin((angle * Math.PI) / 180);
            const x2 = centerX + 40 * Math.cos((angle * Math.PI) / 180);
            const y2 = centerY + 40 * Math.sin((angle * Math.PI) / 180);
            const labelX = centerX + 47 * Math.cos((angle * Math.PI) / 180);
            const labelY = centerY + 47 * Math.sin((angle * Math.PI) / 180);
            const label = (minPressure + ((maxPressure - minPressure) / 6) * i).toFixed(2);
            
            return (

                <React.Fragment key={i}>
                <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={gaugeColor} 
                strokeWidth="2"
                strokeLinecap="round"
                />
                {i % 2 === 0 && (
                <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    className="text-xs fill-gray-300"
                >
                    {label}
                </text>
                )}
            </React.Fragment>
                );
                })}

        {/* Needle */}
        <line
        x1={centerX}
        y1={centerY}
        x2={endX}
        y2={endY}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transition: "all 0.5s ease-in-out" }}
        />
                
        {/* Center dot */}
        <circle
            cx={centerX}
            cy={centerY}
            r="3"
            fill="white"
        />
        </svg>

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-3xl font-bold">{pressureIn.toFixed(2)}</p>
        <p className="text-sm">inHg</p>
        </div>
    </div>

    {/* Low and High Labels with actual values */}
        <div className="flex justify-between items-center text-sm mt-2">
    <span className="flex flex-col items-start">
        <span className="font-bold text-blue-500">{minPressure} inHg</span>
        <span className="text-gray-400">Low Pressure</span>
    </span>
    <span className="flex flex-col items-end">
        <span className="font-bold text-yellow-500">{maxPressure} inHg</span>
        <span className="text-gray-400">High Pressure</span>
    </span>
    </div>
    </div>
  );
};

export default Pressure;