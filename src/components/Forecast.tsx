'use client';

import React from 'react';
import Slider from 'react-slick';
import { Forecast as ForecastType } from '@/lib/types';

interface ForecastProps {
forecastData: ForecastType;
}

const Forecast: React.FC<ForecastProps> = ({ forecastData }) => {
const { forecastday } = forecastData;

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
    {
        breakpoint: 1024, // desktop 
        settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: false,
        arrows: false,
        },
    },
    {
        breakpoint: 768, // tablet 
        settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        },
    },
    {
        breakpoint: 480, // mobile 
        settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false, 
        },
    },
    ],
};

const convertToStandardTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const standardHours = hours % 12 || 12; 
    return `${standardHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
};

return (
    <div className="mt-6">
    <h2 className="text-2xl font-bold mb-4 text-center">Hourly Forecast</h2>
    {forecastday.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-6">
        {/* <h3 className="text-xl font-semibold mb-2 text-center">
            {day.date.split('-').slice(1).join('-')}
        </h3> */}
        <Slider {...settings}>
            {day.hour.map((hour, index) => (
            <div key={index} className="p-2">
                <div className="cursor-pointer bg-accent hover:shadow-lg transition duration-300 ease-in-out p-4 rounded shadow text-center">
                <p className="font-semibold">{convertToStandardTime(hour.time.split(' ')[1])}</p>
                <img
                    src={hour.condition.icon}
                    alt={hour.condition.text}
                    className="mx-auto"
                />
                <p>{hour.temp_f}°F</p>
                </div>
            </div>
            ))}
        </Slider>
        </div>
    ))}
    </div>
);
};

export default Forecast;