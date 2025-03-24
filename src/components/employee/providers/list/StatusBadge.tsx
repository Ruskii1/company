
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ProviderStatus } from '@/types/provider';

interface StatusBadgeProps {
  status: ProviderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusBadgeVariant = (status: ProviderStatus) => {
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
    <Badge variant={getStatusBadgeVariant(status) as any}>
      {getFormattedStatus(status)}
    </Badge>
  );
}
