
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AvailabilityBadgeProps {
  status: 'online' | 'offline';
  lastSeen: string;
}

export function AvailabilityBadge({ status, lastSeen }: AvailabilityBadgeProps) {
  const lastSeenDate = new Date(lastSeen);
  const formattedDate = lastSeenDate.toLocaleDateString();
  const formattedTime = lastSeenDate.toLocaleTimeString();
  
  return (
    <Badge variant={status === 'online' ? 'default' : 'secondary'}>
      {status === 'online' 
        ? 'Online Now' 
        : `Offline since ${formattedDate} ${formattedTime}`}
    </Badge>
  );
}
