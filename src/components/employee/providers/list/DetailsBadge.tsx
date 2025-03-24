
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServiceProvider } from '@/types/provider';
import { formatDistanceToNow } from 'date-fns';

interface DetailsBadgeProps {
  provider: ServiceProvider;
}

export function DetailsBadge({ provider }: DetailsBadgeProps) {
  const getAvailabilityLabel = () => {
    if (provider.availabilityStatus === 'online') {
      return 'Online';
    }
    
    try {
      const lastSeenDate = new Date(provider.lastSeen);
      return `Offline (Last seen: ${formatDistanceToNow(lastSeenDate, { addSuffix: true })})`;
    } catch (e) {
      return 'Offline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending_review':
        return 'warning';
      case 'suspended':
      case 'blacklisted':
        return 'destructive';
      case 'paused':
        return 'outline';
      case 'deleted':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getFormattedStatus = (status: string) => {
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
    <div className="space-y-2">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Availability Status:</p>
        <Badge variant={provider.availabilityStatus === 'online' ? 'success' : 'secondary'} className="w-fit">
          {getAvailabilityLabel()}
        </Badge>
      </div>
      
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Account Status:</p>
        <Badge variant={getStatusBadgeVariant(provider.status)} className="w-fit">
          {getFormattedStatus(provider.status)}
        </Badge>
      </div>
    </div>
  );
}
