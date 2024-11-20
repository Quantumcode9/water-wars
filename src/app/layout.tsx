import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]/options';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import { Providers } from '@/components/Providers';
import { WeatherDataProvider } from '@/context/WeatherDataContext';
import { TemperatureUnitProvider } from '@/context/TemperatureUnitContext';
import SettingsSidebar from '@/components/SettingsSidebar';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/app/globals.css';

export const metadata = {
  title: "Cloudy With A Chance Of Chaos Probability",
  description: "Weather alerts",
};

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
            <div className="flex flex-col h-screen overflow-hidden">
              {/* Header */}
              <header className="relative z-50 flex items-center justify-between p-4 bg-border border-b">
              <h1
                className="text-white font-semibold overflow-visible"
                style={{
                  fontSize: 'clamp(0.8rem, 4vw, 1.4rem)', // More responsive scaling due to title length 
                }}
              >
                  Cloudy With A Chance Of Chaos Probability
                </h1>
                <div className="flex x-4">
                {/* Sidebar for Accessibility */}
                <SettingsSidebar
                
                />
                </div>
              </header>
            

              {/* Sidebar and Main Content */}
              <div className="flex flex-1 overflow-y-auto">
                <div className="hidden md:block">
                  <Sidebar />
                </div>

                <main className="flex-1 overflow-x-hidden bg-background p-4">
                  {children}
                </main>
              </div>

              {/* Mobile bottom navigation */}
              <MobileMenu />
            </div>
          </TemperatureUnitProvider>
        </WeatherDataProvider>
      </Providers>
    </body>
  </html>
  );
}