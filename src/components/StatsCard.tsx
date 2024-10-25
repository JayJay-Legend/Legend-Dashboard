import React, { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: number;
}

function StatsCard({ icon, title, value }: StatsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex items-center">
      <div className="p-3 rounded-full bg-purple-600 text-white mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-white/70 text-sm">{title}</h3>
        <p className="text-white text-2xl font-bold">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default StatsCard;