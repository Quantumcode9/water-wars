import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]/options';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import { Providers } from '@/components/Providers';
import AuthControl from '@/components/AuthControl';
import '@/app/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="on">
      <body>
        <Providers session={session}>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar - hidden on mobile, visible on desktop */}
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Mobile header */}
              <header className="flex items-center justify-between p-4 bg-white border-b">
                <h1 className="text-xl font-semibold">WeatherWise</h1>
                <div className="flex items-center">
                  <AuthControl />
                  <div className="lg:hidden ml-4">
                    <MobileMenu />
                  </div>
                </div>
              </header>
              
              {/* Page content */}
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}