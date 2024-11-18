import React from 'react';
import { Moon } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

interface AlienActivityProps {
  moonPhase: string;
}

const getAlienActivity = (moonPhase: string) => {
  switch (moonPhase.toLowerCase()) {
    case 'new moon':
      return {
        category: 'Low',
        color: 'text-green-500',
        recommendation: 'The night sky is clear of extraterrestrial threat.',
      };
    case 'waxing crescent':
      return {
        category: 'Mild',
        color: 'text-yellow-500',
        recommendation: 'A singular spaceship has arrived on our moon.',
      };
    case 'first quarter':
      return {
        category: 'Moderate',
        color: 'text-orange-500',
        recommendation: 'NASA says the visiting aliens are friendly. But they look hungry.',
      };
    case 'waxing gibbous':
      return {
        category: 'High',
        color: 'text-red-500',
        recommendation: 'Uhhh the number of aliens on our lawn doubled overnight. They\'re asking for our good coffee.',
      };
    case 'full moon':
      return {
        category: 'Very High',
        color: 'text-purple-500',
        recommendation: 'I just watched a crowd of aliens ransack a Target.',
      };
    case 'waning gibbous':
      return {
        category: 'Extreme',
        color: 'text-blue-500',
        recommendation: 'Our children are being replaced by alien look-alikes.',
      };
    case 'last quarter':
      return {
        category: 'Critical',
        color: 'text-white',
        recommendation: 'Enough. We must reclaim our planet from the alien invasion! Prepare yourselves for battle!',
      };
    case 'waning crescent':
      return {
        category: 'Apocalyptic',
        color: 'text-gray-900',
        recommendation: 'Aliens have taken over Earth. Nothing has changed because they\'re obsessed with TikTok.',
      };
    default:
      return {
        category: 'Unknown',
        color: 'text-gray-500',
        recommendation: 'Alien activity cannot be determined. They might be on vacation.',
      };
  }
};

const AlienActivity: React.FC<AlienActivityProps> = ({ moonPhase }) => {
  const { category, color, recommendation } = getAlienActivity(moonPhase);

  return (
    <DashboardCard
      title="Alien Activity"
      value={
        <div className="flex items-center justify-between space-x-4">
          <span className={`text-xl md:text-2xl font-bold ${color}`}>{category}</span>
          <div className="text-sm md:text-base text-gray-500 mt-1">{moonPhase}</div>
        </div>
      }
      icon={Moon}
      recommendation={recommendation}
    />
  );
};

export default AlienActivity;