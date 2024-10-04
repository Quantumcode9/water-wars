'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/accordion.css';

interface PreparednessItem {
  name: string;
  type: string;
  items: string[];
}

interface FEMAIncident {
  incidentType: string;
}

const preparednessData: Record<string, PreparednessItem> = {
  Fire: {
    name: 'Fire',
    type: 'Fire Preparedness',
    items: [
      'Install smoke alarms on every level of your home, inside bedrooms and outside sleeping areas.',
      'Create a fire escape plan with at least two ways out of every room and practice it regularly.',
      'Keep a fire extinguisher in accessible locations and learn how to use it.',
      'If there is a fire, get out, stay out, and call 911 or your local emergency number.',
    ],
  },
  Flood: {
    name: 'Flood',
    type: 'Flood Preparedness',
    items: [
      'Move to higher ground if you are in a flood-prone area or after receiving a flood warning.',
      'Do not walk, swim, or drive through floodwaters.',
      'Prepare an emergency kit with enough food, water, and essential supplies for at least 3 days.',
      'Stay tuned to local news and weather updates to follow official instructions.',
    ],
  },
  Hurricane: {
    name: 'Hurricane',
    type: 'Hurricane Preparedness',
    items: [
      'Create an emergency kit with food, water, and supplies for at least 3 days.',
      'Know your evacuation route and have a plan for where to go if a hurricane approaches.',
      'Secure outdoor furniture and objects that could become projectiles in high winds.',
      'Stay informed about the storm\'s progress and follow official instructions.',
    ],
  },
  Tornado: {
    name: 'Tornado',
    type: 'Tornado Preparedness',
    items: [
      'Seek shelter in a basement or an interior room on the lowest floor of a sturdy building.',
      'Avoid sheltering in vehicles, under bridges, or in mobile homes.',
      'If outside with no shelter, lie flat in a low spot and cover your head and neck.',
      'Know the difference between a tornado watch and a tornado warning.',
    ],
  },
  Earthquake: {
    name: 'Earthquake',
    type: 'Earthquake Preparedness',
    items: [
      'Secure heavy furniture and objects to walls to prevent them from falling during shaking.',
      'Know safe places in each room, such as under sturdy furniture or against an interior wall.',
      'Have an emergency kit ready with first-aid supplies, food, and water.',
      'Practice "Drop, Cover, and Hold On" drills regularly.',
    ],
  },
  'Severe Storm': {
    name: 'Severe Storm',
    type: 'Severe Storm Preparedness',
    items: [
      'Stay indoors and avoid using electrical appliances or taking a shower during a thunderstorm.',
      'Unplug electronics to protect them from power surges caused by lightning.',
      'If outside, seek shelter immediately in a sturdy building or hard-topped vehicle.',
      'Stay tuned to weather alerts and be prepared for possible power outages.',
    ],
  },
  Drought: {
    name: 'Drought',
    type: 'Drought Preparedness',
    items: [
      'Conserve water by fixing leaks and reducing usage where possible.',
      'Follow local water usage restrictions and guidelines.',
      'Use mulch in gardens to retain soil moisture.',
      'Prepare for potential water shortages by storing emergency water supplies.',
    ],
  },
  Snowstorm: {
    name: 'Snowstorm',
    type: 'Snowstorm Preparedness',
    items: [
      'Stay indoors during severe winter storms and limit travel unless absolutely necessary.',
      'Keep an emergency kit with extra blankets, non-perishable food, and water in your home and vehicle.',
      'Ensure your vehicle is equipped with a snow shovel, ice scraper, and sand for traction.',
      'Be aware of signs of hypothermia and frostbite, and dress in warm layers to protect yourself.',
    ],
  },
  Volcano: {
    name: 'Volcano',
    type: 'Volcano Preparedness',
    items: [
      'Know your evacuation routes and be prepared to evacuate if you live near a volcano.',
      'Have an emergency kit with protective masks, goggles, and enough supplies for at least 3 days.',
      'If there is an ashfall, stay indoors, close windows, and avoid driving unless absolutely necessary.',
      'Avoid low-lying areas and rivers as volcanic mudflows (lahars) may occur.',
    ],
  },
  Tsunami: {
    name: 'Tsunami',
    type: 'Tsunami Preparedness',
    items: [
      'If you live in a coastal area, know your tsunami evacuation routes.',
      'Move to higher ground immediately if you feel an earthquake or receive a tsunami warning.',
      'Stay away from the shore, as the first wave may not be the largest.',
      'Stay tuned to local news for updates and follow official instructions during and after a tsunami warning.',
    ],
  },
  'Biological Event': {
    name: 'Biological Event',
    type: 'Biological Event Preparedness (Pandemic)',
    items: [
      'Follow public health guidelines such as social distancing, wearing masks, and regular handwashing.',
      'Stay informed about the spread of the disease and follow recommendations for vaccinations or treatments.',
      'Stock up on necessary supplies like food, water, and medications in case of quarantines or shortages.',
      'Develop a family emergency plan that includes how to handle illness and access to healthcare.',
    ],
  },
};

const PreparednessPage = () => {
    const [filteredPreparednessData, setFilteredPreparednessData] = useState<PreparednessItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [location, setLocation] = useState<{ state: string; county: string } | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      const storedLocation = localStorage.getItem('userLocation');
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      } else {
        setError('Location information is not available. Please return to the dashboard.');
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      const fetchDisasterData = async () => {
        if (!location) return;
  
        try {
          const response = await fetch(
            `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?state=${location.state}&designatedArea=${location.county}&declarationDateStart=2020-01-01`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch disaster data.');
          }
          const data = await response.json();
          const recentIncidents: FEMAIncident[] = data.DisasterDeclarationsSummaries.slice(0, 500);
  
          const incidentTypes = recentIncidents.map((incident) => incident.incidentType);
  
          const filteredData = Object.keys(preparednessData)
            .filter((key) => incidentTypes.includes(preparednessData[key].name))
            .map((key) => preparednessData[key]);
  
          setFilteredPreparednessData(filteredData);
        } catch (error) {
          console.error('Error fetching FEMA data:', error);
          setError('Could not retrieve disaster data.');
        } finally {
          setLoading(false);
        }
      };
  
      if (location) {
        fetchDisasterData();
      }
    }, [location]);
  
    const handleAccordionClick = (index: number) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    if (loading) {
      return <p>Loading preparedness data...</p>;
    }
  
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <button onClick={() => router.push('/')} className="mt-4 bg-button hover:bg-green-900 text-white px-4 py-2 rounded-lg">
            Return to Dashboard
          </button>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 text-center py-8">
        <h1 className="text-3xl font-bold mb-6">
          Disaster Preparedness for {location?.county}, {location?.state}
        </h1>
        <div className="space-y-6">
          {filteredPreparednessData.length > 0 ? (
            filteredPreparednessData.map((disaster, index) => (
              <Accordion
                key={index}
                title={disaster.type}
                items={disaster.items}
                isOpen={activeIndex === index}
                onClick={() => handleAccordionClick(index)}
              />
            ))
          ) : (
            <p>No relevant preparedness information for recent incidents.</p>
          )}
        </div>
        <button onClick={() => router.push('/')} className="mt-8 bg-button hover:bg-green-900  text-white px-4 py-2 rounded-lg">
          Return to Dashboard
        </button>
      </div>
    );
  };
  
  

// Accordion component
const Accordion = ({ title, items, isOpen, onClick }: { title: string; items: string[]; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="accordion-item mb-4 border-b">
      <button
        className="accordion-title w-full text-black flex justify-between items-center text-left py-3 text-lg font-semibold"
        onClick={onClick}
      >
        <span>{title}</span>
        <img
          src={isOpen ? '/images/icon-minus.svg' : '/images/icon-plus.svg'}
          alt={isOpen ? 'Collapse' : 'Expand'}
          className="w-6 h-6"
        />
      </button>
      {isOpen && (
        <ul className="accordion-content pl-6 space-y-2 text-gray-700">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreparednessPage;