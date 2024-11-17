import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]/options';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import { Providers } from '@/components/Providers';
import AuthControl from '@/components/AuthControl';
import { WeatherDataProvider } from '@/context/WeatherDataContext';
import { TemperatureUnitProvider } from '@/context/TemperatureUnitContext';
import DarkModeToggle from '@/components/DarkModeToggle';
import UnitToggle from '@/components/UnitToggle';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/app/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

return (
  <html lang="en">
    <body>
      <Providers session={session}>
      <WeatherDataProvider>
      <TemperatureUnitProvider>
      <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
        <header className="relative flex items-center justify-between p-4 bg-border border-b">
          <h1 className="text-xl text-white font-semibold overflow-visible">
            Cloudy with A Chance of Chaos Probability
          </h1>
            <div className="flex space-x-4">
            <UnitToggle />
              <DarkModeToggle />

              <AuthControl />
            </div>
        </header>
          {/* Sidebar */}
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

            {/* Main content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 pb-16 lg:pb-4">
              {children}
            </main>

            {/* Mobile bottom navigation */}
            <MobileMenu />
          </div>
        </div>
        </TemperatureUnitProvider>
      </WeatherDataProvider>
      </Providers>
    </body>
  </html>
);
}