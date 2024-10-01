import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session.user.name || session.user.email}!</p>
      {/* Add more dashboard content here */}
    </div>
  );
}