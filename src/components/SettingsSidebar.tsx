'use client';

import React, { useState } from 'react';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DarkModeToggle from './DarkModeToggle';
import UnitToggle from './UnitToggle';
import AuthControl from '@/components/AuthControl';


const SettingsSidebar = () => {
const { data: session } = useSession();
const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => setMenuOpen(!menuOpen);

return (
    <nav className="relative">
        {/* Menu Toggle Button */}
        <button onClick={toggleMenu}
            className={`absolute top-6.5 right-0 cursor-pointer z-50 flex flex-col space-y-1 ${
            menuOpen ? 'transform rotate-90 text-highlight' : ''}`}>
            <div 
                className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                menuOpen ? 'bg-highlight rotate-45 translate-y-2' : ''}`}>
            </div>
            <div
                className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''}`}>
            </div>
            <div
                className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                menuOpen ? 'bg-highlight -rotate-45 -translate-y-2' : ''}`}>
            </div>
        </button>

    {/* Sidebar Menu */}
    
<div
  className={`fixed top-[60px] right-0 h-[56vh] w-64 bg-[#2d2d2d] text-white transform transition-transform duration-300 ${
    menuOpen ? 'translate-x-0' : 'translate-x-full'
  } z-40`}
>
        
        <ul className="list-none p-0 m-0">
        {session ? (
            <>
            <li className="p-4 border-b border-gray-700">Hello, {session.user.name}</li>
            <li className="p-4 border-b border-gray-700 hover:uppercase">
            Unit Converter
                <UnitToggle/>  {/* Toggle region units */}
            </li>
            <li className="p-4 border-b border-gray-700 hover:uppercase">
            Change Theme 
                <DarkModeToggle />  {/* Toggle theme*/}
            </li>
            <li className="p-4 border-b border-gray-700 hover:uppercase">
                <AuthControl/>   {/* Sign in and out*/}
                </li>
            {/* TODO */}

            {/* <li className="p-4 border-b border-gray-700 hover:uppercase transition-all duration-200">
            <Link href="/settings">Settings</Link>
            </li> */}
            {/* <li className="p-4 border-b border-gray-700 hover:uppercase">
            <Link href="/account">Account</Link>
            </li> */}
            {/* <li className="p-4 border-b border-gray-700 hover:uppercase transition-all duration-200">
            <Link href="/docs/privacy">Privacy Policy</Link>
            </li> */}
            {/* <li className="p-4 border-b border-gray-700 hover:uppercase transition-all duration-200">
            <Link href="/doc/tos">Term of Service</Link>
            </li> */}
            </>
        ) : (
            <li className="p-4 border-b border-gray-700">
            </li>
        )}
        </ul>
        
    </div>
    </nav>
);
};

export default SettingsSidebar;