import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | ReactNode;
  icon: LucideIcon;
  recommendation: string;
}


const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, recommendation }) => (
  <div className="bg-surface hover:shadow-lg rounded-lg shadow-md p-4 md:p-6 cursor-arrow">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide text-primary">
        {title}
      </h2>
      <Icon size={24} className="text-blue-500 md:text-blue-600 lg:text-blue-700" />
    </div>
    <div className="text-lg md:text-2xl lg:text-3xl font-extrabold text-secondary mb-3">
      {value}
    </div>
    <p className="text-xs md:text-sm lg:text-md text-textSecondary leading-relaxed">
      {recommendation}
    </p>
  </div>
);
export default DashboardCard;



