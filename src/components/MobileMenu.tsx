'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-800 opacity-25" onClick={() => setIsOpen(false)}></div>
          <nav className="relative z-10 px-8 py-4 bg-white w-64 h-full">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">WeatherWise</h1>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-2">
              <li><Link href="/" className="block py-2" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
              <li><Link href="/precipitation" className="block py-2" onClick={() => setIsOpen(false)}>Precipitation</Link></li>
              <li><Link href="/temperature" className="block py-2" onClick={() => setIsOpen(false)}>Temperature</Link></li>
              <li><Link href="/tinfoil-hat" className="block py-2" onClick={() => setIsOpen(false)}>Tinfoil Hat</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;