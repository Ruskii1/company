
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ServiceProvider } from '@/types/provider';
import { CircleDot, CircleOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DetailsBadgeProps {
  provider: ServiceProvider;
}

export function DetailsBadge({ provider }: DetailsBadgeProps) {
  const getBadgeColor = (status: string) => {
    return status === 'online' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 border-0'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 border-0';
  };

  const getAvailabilityLabel = () => {
    try {
      if (provider.availabilityStatus === 'online') {
        return 'Online';
      }
      
      const lastSeenDate = new Date(provider.lastSeen);
      const timeAgo = formatDistanceToNow(lastSeenDate, { addSuffix: true });
      return `Last seen ${timeAgo}`;
    } catch (e) {
      return provider.availabilityStatus === 'online' ? 'Online' : 'Offline';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 text-xs ${getBadgeColor(provider.availabilityStatus)}`}
    >
      {provider.availabilityStatus === 'online' ? (
        <CircleDot className="h-3 w-3" />
      ) : (
        <CircleOff className="h-3 w-3" />
      )}
      {getAvailabilityLabel()}
    </Badge>
  );
}
