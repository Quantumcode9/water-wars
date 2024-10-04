'use client';

import React from 'react';
import { Waves } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

interface AirQualityIndexProps {
airQuality: AirQualityData | null;
onClick: () => void;
}

interface AirQualityData {
co: number;
no2: number;
o3: number;
so2: number;
pm2_5: number;
pm10: number;
'us-epa-index': number;
'gb-defra-index': number;
}

const aqiBreakpoints = {
pm2_5: [
    { concentration: 0.0, aqi: 0 },
    { concentration: 12.0, aqi: 50 },
    { concentration: 35.4, aqi: 100 },
    { concentration: 55.4, aqi: 150 },
    { concentration: 150.4, aqi: 200 },
    { concentration: 250.4, aqi: 300 },
    { concentration: 350.4, aqi: 400 },
    { concentration: 500.4, aqi: 500 },
],
pm10: [
    { concentration: 0, aqi: 0 },
    { concentration: 54, aqi: 50 },
    { concentration: 154, aqi: 100 },
    { concentration: 254, aqi: 150 },
    { concentration: 354, aqi: 200 },
    { concentration: 424, aqi: 300 },
    { concentration: 504, aqi: 400 },
    { concentration: 604, aqi: 500 },
],
no2: [
    { concentration: 0, aqi: 0 },
    { concentration: 53, aqi: 50 },
    { concentration: 100, aqi: 100 },
    { concentration: 360, aqi: 150 },
    { concentration: 649, aqi: 200 },
    { concentration: 1249, aqi: 300 },
    { concentration: 1649, aqi: 400 },
    { concentration: 2049, aqi: 500 },
],
so2: [
    { concentration: 0, aqi: 0 },
    { concentration: 35, aqi: 50 },
    { concentration: 75, aqi: 100 },
    { concentration: 185, aqi: 150 },
    { concentration: 304, aqi: 200 },
    { concentration: 604, aqi: 300 },
    { concentration: 804, aqi: 400 },
    { concentration: 1004, aqi: 500 },
],
co: [
    { concentration: 0, aqi: 0 },
    { concentration: 4.4, aqi: 50 },
    { concentration: 9.4, aqi: 100 },
    { concentration: 12.4, aqi: 150 },
    { concentration: 15.4, aqi: 200 },
    { concentration: 30.4, aqi: 300 },
    { concentration: 40.4, aqi: 400 },
    { concentration: 50.4, aqi: 500 },
],
};

const calculatePollutantAQI = (
concentration: number,
breakpoints: { concentration: number; aqi: number }[]
) => {
if (concentration < breakpoints[0].concentration) {
    return breakpoints[0].aqi;
}

for (let i = 0; i < breakpoints.length - 1; i++) {
    const low = breakpoints[i];
    const high = breakpoints[i + 1];
    if (
    concentration >= low.concentration &&
    concentration <= high.concentration
    ) {
    return (
        ((high.aqi - low.aqi) / (high.concentration - low.concentration)) *
        (concentration - low.concentration) +
        low.aqi
    );
    }
}

return breakpoints[breakpoints.length - 1].aqi;
};

const convertCO = (coUgM3: number) => {
return coUgM3 * 0.000872;
};

const convertNO2 = (no2UgM3: number) => {
return no2UgM3 * 0.5229;
};

const convertSO2 = (so2UgM3: number) => {
return so2UgM3 * 0.376;
};

const getAirQualityCategory = (index: number) => {
if (index <= 50) {
    return {
    category: 'Good',
    color: 'text-green-500',
    recommendation: 'Perfect for a picnic – go touch some grass!.',
    };
} else if (index <= 100) {
    return {
    category: 'Moderate',
    color: 'text-yellow-500',
    recommendation: 'The air is a little off, but pickleball is too fun to bail now.',
    };
} else if (index <= 150) {
    return {
    category: 'Unhealthy',
    color: 'text-orange-500',
    recommendation: 'Hmm, stay indoors – I know you want an excuse to continue that show.',
    };
} else if (index <= 200) {
    return {
    category: 'Unhealthy',
    color: 'text-red-500',
    recommendation: 'Ooohkay, breathing is a little too rough right now. Go lie down.',
    };
} else if (index <= 300) {
    return {
    category: 'Very Unhealthy',
    color: 'text-purple-500',
    recommendation: 'Yuck, is it too late to build a submarine and escape under the sea?',
    };
} else {
    return {
    category: 'Hazardous',
    color: 'text-red-900',
    recommendation: 'Put on a gas mask, quickly!',
    };
}
};

const AirQualityIndex: React.FC<AirQualityIndexProps> = ({ airQuality }) => {
if (!airQuality) {
    return null;
}

const aqiValues = [
    calculatePollutantAQI(airQuality.pm2_5, aqiBreakpoints.pm2_5),
    calculatePollutantAQI(airQuality.pm10, aqiBreakpoints.pm10),
    calculatePollutantAQI(convertNO2(airQuality.no2), aqiBreakpoints.no2),
    calculatePollutantAQI(convertSO2(airQuality.so2), aqiBreakpoints.so2),
    calculatePollutantAQI(convertCO(airQuality.co), aqiBreakpoints.co),
];


const airQualityIndex = Math.round(Math.max(...aqiValues));

const { category, color, recommendation } = getAirQualityCategory(airQualityIndex);

return (

    <DashboardCard
        title="Air Quality"
        value={<span className={color}>{`${airQualityIndex} | ${category}`}</span>}
        icon={Waves}
        recommendation={recommendation}
    />

);
};

export default AirQualityIndex;