'use client';
import React from 'react';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-full h-full flex items-center justify-between px-4 py-5 bg-transparent rounded"
    >
      <span className="block">Change Theme</span>
      {isDarkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;