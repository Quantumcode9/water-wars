'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import { Forecast as ForecastType } from '@/lib/types';
import { useTemperatureUnit } from '@/context/TemperatureUnitContext';
import Image from 'next/image';

interface ForecastProps {
forecastData: ForecastType;
}

const Forecast: React.FC<ForecastProps> = ({ forecastData }) => {
const { forecastday } = forecastData;

const [currentHourIndex, setCurrentHourIndex] = useState(0);
const [currentDayIndex, setCurrentDayIndex] = useState(0);
const { isFahrenheit } = useTemperatureUnit();

useEffect(() => {
const now = new Date();
const currentHour = now.getHours();
const currentDate = now.toISOString().split('T')[0];

let dayIdx = forecastday.findIndex((day) => day.date === currentDate);
if (dayIdx === -1) {
    dayIdx = 0;
}

const hourIdx = forecastday[dayIdx].hour.findIndex((hour) => {
    const hourTime = new Date(hour.time);
    return hourTime.getHours() === currentHour;
});

setCurrentDayIndex(dayIdx);
setCurrentHourIndex(hourIdx === -1 ? 0 : hourIdx);
}, [forecastday]);

const settings = useMemo(() => ({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    initialSlide: currentHourIndex, // Start slider at the current hour index
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4, infinite: false, arrows: false } },
        { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3, arrows: false } },
        { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2, arrows: false } },
    ],
}), [currentHourIndex]);

const convertToStandardTime = (time: string) => {
const [hours, minutes] = time.split(':').map(Number);
const period = hours >= 12 ? 'PM' : 'AM';
const standardHours = hours % 12 || 12;
return `${standardHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
};

return (
<div className="mt-6">
    <h2 className="text-2xl font-semibold mb-4 text-center">Hourly Forecast</h2>
    {forecastday.map((day, dayIndex) => (
    <div key={dayIndex} className="mb-6">
        <Slider
        {...settings}
        initialSlide={dayIndex === currentDayIndex ? currentHourIndex : 0} 
        >
        {day.hour.map((hour, index) => {
            const isCurrentHour =
            dayIndex === currentDayIndex && index === currentHourIndex;
            return (
            <div key={index} className="p-2">
                <div
                    className={`cursor-pointer h-40 bg-accent hover:shadow-lg transition duration-300 ease-in-out p-4 rounded shadow text-center 
                    ${isCurrentHour ? 'ring-4 ring-blue-500' : ''}`}
                >
                <p className="font-semibold text-sm">
                    {convertToStandardTime(hour.time.split(' ')[1])}
                </p>
                <Image
                    src={`https:${hour.condition.icon}`}
                    alt={hour.condition.text}
                    width={48}
                    height={48}
                    className="mx-auto"
                />
                <p className="font-bold text-lg mt-2">
                    {isFahrenheit
                    ? `${hour.temp_f}°F`
                    : `${hour.temp_c}°C`}
                </p>
                {isCurrentHour && (
                    <p className="font-bold text-red-500 text-s">NOW</p>
                )}
                </div>
            </div>
            );
        })}
        </Slider>
    </div>
    ))}
</div>
);
};

export default Forecast;