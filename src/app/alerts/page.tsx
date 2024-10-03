'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Alert {
  headline: string;
  description: string;
  severity: string;
  msgtype: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  instruction: string;
}

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [location, setLocation] = useState<{ state: string; county: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    const storedAlerts = localStorage.getItem('weatherAlerts');

    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }

    if (storedAlerts) {
      const parsedAlerts = JSON.parse(storedAlerts);
      if (parsedAlerts.alert) {
        setAlerts(parsedAlerts.alert);
      }
    }
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'extreme':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'severe':
        return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'moderate':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Weather Alerts for {location ? `${location.county}, ${location.state}` : 'Your Area'}
      </h1>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div
            key={index}
            className={`${getSeverityColor(alert.severity)} border-l-4 p-4 mb-4`}
            role="alert"
          >
            <p className="font-bold">{alert.headline || alert.event}</p>
            <p>{alert.description}</p>
            <p className="italic">{alert.instruction}</p>
          </div>
        ))
      ) : (
        <p>No current weather alerts for your area.</p>
      )}
      <button onClick={() => router.push('/')} className="mt-8 bg-button hover:bg-green-900 text-white px-4 py-2 rounded-lg">
        Return to Dashboard
      </button>
    </div>
  );
};

export default AlertsPage;