// src/components/UnitToggle.tsx
'use client';

import React from 'react';
import { Thermometer, ThermometerSnowflake } from 'lucide-react';
import { useTemperatureUnit } from '@/context/TemperatureUnitContext';

const UnitToggle = () => {
const { isFahrenheit, setUnit } = useTemperatureUnit();

const handleToggle = () => {
    // optional toggle between fahrenheit and celsius
    setUnit(!isFahrenheit);
};

return (
    <button
    onClick={handleToggle}
    className="w-full h-full flex items-center justify-between px-4 py-5 bg-transparent rounded"
    >
    <span className="block">Change Unit</span>
    {isFahrenheit ? (
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