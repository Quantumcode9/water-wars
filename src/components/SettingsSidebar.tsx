'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import DarkModeToggle from './DarkModeToggle';
import UnitToggle from './UnitToggle';
import AuthControl from '@/components/AuthControl';

interface SettingsSidebarProps {
onClose?: () => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ onClose }) => {
const { data: session } = useSession();
const [menuOpen, setMenuOpen] = useState(false);
const sidebarRef = useRef<HTMLDivElement>(null);
const toggleButtonRef = useRef<HTMLButtonElement>(null);

const toggleMenu = () => {
    setMenuOpen(prev => !prev);
};

const handleClose = () => {
    setMenuOpen(false);
    onClose?.();
};

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    // Check if click is outside both sidebar and toggle button
    if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
    ) {
        handleClose();
    }
    };

    const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menuOpen) {
        handleClose();
    }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Clean up
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
    };
}, [menuOpen, onClose]);

return (
    <nav className="relative">
    {/* Menu Toggle Button */}
    <button
        ref={toggleButtonRef}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close' : 'Open'}
        className={`absolute top-6.5 right-0 cursor-pointer z-50 flex flex-col space-y-1`}
    >
        <div className="flex flex-col space-y-1 w-6">
        <div
            className={`h-0.5 bg-gray-200 transition-all duration-300 ${
            menuOpen ? ' bg-red-500 transform rotate-45 translate-y-1.5' : ''
            }`}
        />
        <div
            className={`h-0.5 bg-gray-200 transition-all duration-300 ${
            menuOpen ? 'opacity-0' : ''
            }`}
        />
        <div
            className={`h-0.5 bg-gray-200 transition-all duration-300 ${
            menuOpen ? 'bg-red-500 transform -rotate-45 -translate-y-1.5' : ''
            }`}
        />
        </div>
    </button>

    {/* Possible Backdrop */}
    {/* {menuOpen && (
        <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-30"
        onClick={handleClose}
        />
    )} */}

    {/* Sidebar Menu */}
    <div
        ref={sidebarRef}
        className={`fixed top-[64px] right-0 h-auto w-64 bg-[#2d2d2d] text-white transform transition-transform duration-300 ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40`}
        >
        <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
            <ul className="list-none p-0 m-0">
            {session ? (
                <>
                <li className="p-4 border-b border-gray-700">
                    Hello, {session.user.name}
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
                <>
                <li className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <UnitToggle />
                </li>
                <li className="border-b border-gray-700 hover:bg-gray-700 transition-colors">

                    <DarkModeToggle />
                </li>
                <li className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <AuthControl />
                </li>
                </>
            )}
            </ul>
        </div>
        </div>
    </div>
    </nav>
);
};

export default SettingsSidebar;
