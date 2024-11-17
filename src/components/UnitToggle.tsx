// src/components/UnitToggle.tsx

'use client';

import React from 'react';
import { Thermometer, ThermometerSnowflake, RefreshCw } from 'lucide-react';
import { useTemperatureUnit } from '@/context/TemperatureUnitContext';

const UnitToggle = () => {
const { isFahrenheit, setUnit, isAuto, setIsAuto } = useTemperatureUnit();

const handleToggle = () => {
    if (isAuto) {
    // Exit auto mode
    setIsAuto(false);
    setUnit(true);
    } else if (isFahrenheit) {
    // Switch to Celsius
    setUnit(false);
    } else {
    // Switch to Auto mode
    setIsAuto(true);
    }
};

return (
    <button
    onClick={handleToggle}
    className="flex items-center text-white hover:text-black dark:text-white dark:hover:blue-500 rounded-lg transition-all duration-300 ease-in-out focus:outline-none"
    >
    {isAuto ? (
        <>
        <Thermometer className="w-5 h-5" />
        <RefreshCw className="w-5 h-5" />
        </>
    ) : isFahrenheit ? (
        <>
        <Thermometer className="w-5 h-5" />
        <span>F°</span>
        </>
    ) : (
        <>
        <ThermometerSnowflake className="w-5 h-5" />
        <span>C°</span>
        </>
    )}
    </button>
);
};

export default UnitToggle;