'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', temperature: 4, precipitation: 65 },
  { name: 'Feb', temperature: 6, precipitation: 59 },
  { name: 'Mar', temperature: 10, precipitation: 80 },
  { name: 'Apr', temperature: 14, precipitation: 63 },
  { name: 'May', temperature: 18, precipitation: 79 },
  { name: 'Jun', temperature: 22, precipitation: 60 },
];

const InsightsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Weather Insights</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Temperature and Precipitation Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="temperature" fill="#8884d8" name="Temperature (°C)" />
            <Bar yAxisId="right" dataKey="precipitation" fill="#82ca9d" name="Precipitation (mm)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InsightsPage;