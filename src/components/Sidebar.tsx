'use client';

import React from 'react';
import Link from 'next/link';
import { Sun, Umbrella, Thermometer, Radio } from 'lucide-react';

const Sidebar = () => (
  <div className="h-full w-64 bg-white shadow-lg p-4">
    <div className="flex items-center justify-between mb-4 border-b pb-4">
      <h1 className="text-xl font-semibold">WeatherWise</h1>
    </div>
    <nav>
      <ul className="space-y-2">
        <li><Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"><Sun size={20} /><span>Dashboard</span></Link></li>
        <li><Link href="/precipitation" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"><Umbrella size={20} /><span>Precipitation</span></Link></li>
        <li><Link href="/temperature" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"><Thermometer size={20} /><span>Temperature</span></Link></li>
        <li><Link href="/tinfoil-hat" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"><Radio size={20} /><span>Tinfoil Hat</span></Link></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;