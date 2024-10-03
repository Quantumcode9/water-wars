'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, BarChart2, Shield } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/alerts', icon: Bell, label: 'Alerts' },
    { href: '/insights', icon: BarChart2, label: 'Insights' },
    { href: '/preparedness', icon: Shield, label: 'Preparedness' },
  ];

  return (
    <div className="h-full w-64 bg-border shadow-lg p-4">
      <h1 className="text-2xl font-bold mb-6"></h1>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`flex items-center space-x-2 p-2 rounded-lg ${pathname === item.href ? 'bg-buttonHighlight text-border' : 'text-white hover:shadow-custom-lg'}`}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;