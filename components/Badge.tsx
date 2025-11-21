import React from 'react';
import { DeviceStatus } from '../types';

interface BadgeProps {
  status: string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const getStyles = (s: string) => {
    switch (s) {
      case DeviceStatus.Active:
      case 'Success':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case DeviceStatus.Pending:
      case 'In Progress':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case DeviceStatus.Revoked:
      case 'Failed':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case DeviceStatus.Offline:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles(status)}`}>
      {status}
    </span>
  );
};
