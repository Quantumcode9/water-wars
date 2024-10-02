'use client';

import React from 'react';

const AlertsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Weather Alerts</h1>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
        <p className="font-bold">Heat Advisory</p>
        <p>Extreme heat expected over the next 3 days. Stay hydrated and avoid prolonged sun exposure.</p>
      </div>
      {/* Add more alerts as needed */}
    </div>
  );
};

export default AlertsPage;