import React from 'react';

interface StatBarProps {
  label: string;
  value?: number;
  colorClass?: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value = 0, colorClass = "bg-primary-500" }) => {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
        <span>{label}</span>
        <span>{value > 0 ? `${value}%` : '-'}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-1.5 rounded-full transition-all duration-500 ${colorClass}`} 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
