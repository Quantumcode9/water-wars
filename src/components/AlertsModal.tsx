// components/AlertsModal.tsx

'use client';

import React from 'react';
import { Alert } from '@/lib/types';

interface AlertsModalProps {
alerts: Alert[];
onClose: () => void;
}

const AlertsModal: React.FC<AlertsModalProps> = ({ alerts, onClose }) => {
if (alerts.length === 0) return null;

return (
    <div className="fixed inset-0 flex items-center justify-center" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Weather Alerts</h2>
        {alerts.map((alert, index) => (
        <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{alert.event}</h3>
            <p className="mt-2">{alert.desc}</p>
            {alert.instruction && (
            <p className="mt-2 font-bold">{alert.instruction}</p>
            )}
        </div>
        ))}
        <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded 
                    hover:bg-blue-600"
        >
        Close
        </button>
    </div>
    </div>
);
};

export default AlertsModal;