import React from "react";
import { WeatherData } from "@/lib/types";
import { Gauge } from "lucide-react";

interface PressureProps {
weatherData?: WeatherData | null;
}

const Pressure: React.FC<PressureProps> = ({ weatherData }) => {
    if (!weatherData) {
    return <div>Loading...</div>;
    }

    const pressureIn = weatherData.current.pressure_in;

    // pressure range for inHg
    const minPressure = 29.0;
    const maxPressure = 31.0;

    // Clamp the pressure value between min and max
    const normalizedPressure = Math.min(Math.max(pressureIn, minPressure), maxPressure);

    const gaugeAngle =
    ((normalizedPressure - minPressure) / (maxPressure - minPressure)) * 180 - 180;

    const textColor =
    pressureIn < 29.50
        ? "text-orange-500"
        : pressureIn > 30.20
        ? "text-yellow-500"
        : "text-green-500";
    
    const pressureColor =
    pressureIn < 29.50
        ? "stroke-orange-500"
        : pressureIn > 30.20
        ? "stroke-yellow-500"
        : "stroke-green-500";

    // Migraine Warning Logic
    let migraineWarning = "";
    if (pressureIn < 29.5) {
    migraineWarning = "Pressure is a bit low.";
    } else if (pressureIn > 30.2) {
    migraineWarning = "Pressure is a bit high.";
    } else { 
    migraineWarning = "Little to no pressure.";
    }

    // Calculate endpoint coordinates for the needle
    const needleLength = 35;
    const centerX = 50; 
    const centerY = 50;
    const endX = centerX + needleLength * Math.cos((gaugeAngle * Math.PI) / 180);
    const endY = centerY + needleLength * Math.sin((gaugeAngle * Math.PI) / 180);


    return (
        <div className="bg-surface hover:shadow-lg rounded-lg shadow-md p-3 md:p-3 cursor-arrow mx-auto md:h-52 max-h-52">
        <div className="flex items-center justify-between mb-2">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide text-primary">Pressure</h2>
            <Gauge className="w-5 h-5 text-blue-600" />
        </div>
    
        {/* Grid Layout */}
        <div className="grid grid-cols-2 items-center">
            {/* Left Column: Pressure Number */}
            <div className="flex flex-col ">
            <p className={`text-xl font-bold ${textColor} mb-1`}>{pressureIn.toFixed(2)}</p>
            <p className="text-xs text-gray-500">inHg</p>
            </div>
    
            {/* Right Column: Gauge */}
            <div className="flex justify-center items-center">
            <div className="relative w-38 h-24 md:w-38 md:h-28">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="-10 -5 120 70">
                {/* Gauge Background */}
                <path
                    d="M 10,50 A 40,40 0 0 1 90,50"
                    fill="none"
                    className="stroke-gray-300 dark:stroke-[rgba(255,255,255,0.3)]" 
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                {/* Tick Marks */}
                {Array.from({ length: 7 }).map((_, i) => {
                    const angle = 180 + (i * 180) / 6; // Evenly spaced 
                    const tickLength = i % 2 === 0 ? 8 : 5; 
                    const x1 = centerX + (40 - tickLength) * Math.cos((angle * Math.PI) / 180);
                    const y1 = centerY + (40 - tickLength) * Math.sin((angle * Math.PI) / 180);
                    const x2 = centerX + 40 * Math.cos((angle * Math.PI) / 180);
                    const y2 = centerY + 40 * Math.sin((angle * Math.PI) / 180);
                    const labelX = centerX + 47 * Math.cos((angle * Math.PI) / 180);
                    const labelY = centerY + 47 * Math.sin((angle * Math.PI) / 180);
                    const label = (minPressure + ((maxPressure - minPressure) / 6) * i).toFixed(1);
    
                    return (
                    <React.Fragment key={i}>
                        <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        className="stroke-gray-300 dark:stroke-[rgba(255,255,255,0.3)]" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        />
                        {i % 2 === 0 && (
                        <text
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            className="text-[10px] fill-gray-400 dark:fill-gray-600 ]"
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
                    className={`${pressureColor}`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ transition: "all 0.5s ease-in-out" }}
                />
    
                {/* Center dot */}
                <circle cx={centerX} cy={centerY} r="1" fill="gray" />
                </svg>
            </div>
            </div>
    
            {/* Migraine Warning */}
            <div className="col-span-2">
            <p className="text-xs md:text-sm text-center lg:text-md text-textSecondary leading-relaxed">
                {migraineWarning}
            </p>
            </div>
        </div>
        </div>
    );
};

export default Pressure;