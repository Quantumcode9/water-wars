import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile header */}
            <header className="flex items-center justify-between p-4 bg-white border-b lg:hidden">
              <h1 className="text-xl font-semibold">WeatherWise</h1>
              <MobileMenu />
            </header>
            
            {/* Page content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}