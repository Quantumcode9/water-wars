'use client';

import React from 'react';

const PreparednessPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Disaster Preparedness</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Hurricane Preparedness</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Create an emergency kit with food, water, and supplies for at least 3 days</li>
            <li>Know your evacuation route and have a plan for where to go</li>
            <li>Secure outdoor furniture and objects that could become projectiles in high winds</li>
            <li>Stay informed about the storm&apos;s progress and follow official instructions</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Earthquake Preparedness</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Secure heavy furniture and objects to walls</li>
            <li>Know safe places in each room: under sturdy furniture or against an interior wall</li>
            <li>Have an emergency kit ready with first-aid supplies, food, and water</li>
            <li>Practice &quot;Drop, Cover, and Hold On&quot; drills regularly</li>
          </ul>
        </section>
        {/* Add more sections for other types of natural disasters */}
      </div>
    </div>
  );
};

export default PreparednessPage;