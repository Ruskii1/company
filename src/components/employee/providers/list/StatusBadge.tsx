
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ProviderStatus } from '@/types/provider';

interface StatusBadgeProps {
  status: ProviderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: ProviderStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40';
      case 'pending_review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40';
      case 'paused':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/40';
      case 'blacklisted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40';
      case 'deleted':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/40';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40';
    }
  };

  const getFormattedStatus = (status: ProviderStatus) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending_review':
        return 'Pending Review';
      case 'suspended':
        return 'Suspended';
      case 'paused':
        return 'Paused';
      case 'blacklisted':
        return 'Blacklisted';
      case 'deleted':
        return 'Deleted';
      default:
        return status;
    }
  };

  return (
    <Badge className={`font-medium border-0 ${getStatusColor(status)}`} variant="outline">
      {getFormattedStatus(status)}
    </Badge>
  );
}
