'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Bell, BarChart2, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';

const MobileMenu = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/alerts', icon: Bell, label: 'Alerts' },
    { href: '/insights', icon: BarChart2, label: 'Insights' },
    { href: '/preparedness', icon: Shield, label: 'Preparedness' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
      <ul className="flex justify-around">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={`flex flex-col items-center p-2 ${pathname === item.href ? 'text-blue-500' : 'text-gray-500'}`}>
              <item.icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;