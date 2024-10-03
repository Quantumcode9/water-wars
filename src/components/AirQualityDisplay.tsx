'use client';

import React from 'react';
import { AirQuality } from '@/lib/types';

interface AirQualityProps {
  airQuality: AirQuality | null;
}

const AirQualityDisplay: React.FC<AirQualityProps> = ({ airQuality }) => {
  if (!airQuality) {
    return <p>Loading air quality data...</p>;
  }

  const epaIndex = airQuality['us-epa-index'];
  const defraIndex = airQuality['gb-defra-index'];

  return (
    <div className="mt-6 text-center bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Air Quality Index</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">US EPA Index</p>
        <p className="text-xl text-gray-900">{epaIndex}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">GB DEFRA Index</p>
        <p className="text-xl text-gray-900">{defraIndex}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">PM2.5</p>
        <p className="text-xl text-gray-900">{airQuality.pm2_5}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">PM10</p>
        <p className="text-xl text-gray-900">{airQuality.pm10}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Ozone (O₃)</p>
        <p className="text-xl text-gray-900">{airQuality.o3}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Nitrogen Dioxide (NO₂)</p>
        <p className="text-xl text-gray-900">{airQuality.no2}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Sulphur Dioxide (SO₂)</p>
        <p className="text-xl text-gray-900">{airQuality.so2}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Carbon Monoxide (CO)</p>
        <p className="text-xl text-gray-900">{airQuality.co}</p>
      </div>
    </div>
  </div>
  );
};

export default AirQualityDisplay;