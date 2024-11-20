'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import preparednessData from '@/data/preparedness.json';

interface PreparednessItem {
  name: string;
  type: string;
  items: string[];
}

type PreparednessData = Record<string, PreparednessItem>;
const typedPreparednessData: PreparednessData = preparednessData as PreparednessData;

interface FEMAIncident {
  incidentType: string;
}

const PreparednessPage = () => {
  const [filteredPreparednessData, setFilteredPreparednessData] = useState<PreparednessItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [location, setLocation] = useState<{ state: string; county: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const storedLocation = localStorage.getItem('userLocation');
      if (!storedLocation) {
        setError('Location not found. Please return to the dashboard.');
        setLoading(false);
        return;
      }

      const parsedLocation = JSON.parse(storedLocation);
      setLocation(parsedLocation);

      try {
        const response = await fetch(
          `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?state=${parsedLocation.state}&designatedArea=${parsedLocation.county}&declarationDateStart=2020-01-01`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch disaster data.');
        }

        const data = await response.json();
        const incidentTypes = data.DisasterDeclarationsSummaries.map(
          (incident: FEMAIncident) => incident.incidentType
        );

        const filteredData = Object.keys(typedPreparednessData)
          .filter((key) => incidentTypes.includes(typedPreparednessData[key].name))
          .map((key) => typedPreparednessData[key]);

        setFilteredPreparednessData(filteredData);
      } catch (error) {
        console.error('Error fetching FEMA data:', error);
        setError('Could not retrieve disaster data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
    return <p>Loading preparedness data for {location?.county}, {location?.state}...</p>;
    </div>
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-button hover:bg-green-900 text-white px-4 py-2 rounded-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (filteredPreparednessData.length === 0) {
    return (
      <div>
        <p>No relevant preparedness information for recent incidents in your area.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-button hover:bg-green-900 text-white px-4 py-2 rounded-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 text-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Disaster Preparedness for {location?.county}, {location?.state}
      </h1>
      <div className="space-y-6">
        {filteredPreparednessData.map((disaster, index) => (
          <Accordion
            key={index}
            title={disaster.type}
            items={disaster.items}
            isOpen={activeIndex === index}
            onClick={() => handleAccordionClick(index)}
          />
        ))}
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-8 bg-button hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

// Accordion Component
const Accordion = ({ title, items, isOpen, onClick }: { title: string; items: string[]; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="accordion-item mb-4 border-b">
      <button
        className="accordion-title w-full flex justify-between items-center text-left py-4 px-6 text-lg font-semibold rounded-t-lg bg-surfaceSecondary hover:bg-surfaceHighlight transition-all"
        onClick={onClick}
      >
        <span className='font-medium text-foreground'>{title}</span>
        <img
          src={isOpen ? '/images/icon-minus.svg' : '/images/icon-plus.svg'}
          alt={isOpen ? 'Collapse' : 'Expand'}
          className="w-6 h-6 "
        />
      </button>
      {isOpen && (
        <ul className="accordion-content bg-accent px-6 py-4 space-y-3 pl-6 space-y-2">
          {items.map((item, idx) => (
            <li
            key={idx}
            className="text-foreground font-light border-l-2 border-button pl-4"
          >
            {item}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreparednessPage;