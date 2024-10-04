import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | ReactNode;
  icon: LucideIcon;
  recommendation: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, recommendation }) => (
  <div className=" bg-surface hover:shadow-lg rounded-lg shadow-md p-6 cursor-pointer">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Icon size={24} className="text-blue-500" />
    </div>
    <div className="text-3xl font-bold mb-2">{value}</div>
    <p className="text-textSecondary">{recommendation}</p>
  </div>
);

export default DashboardCard;