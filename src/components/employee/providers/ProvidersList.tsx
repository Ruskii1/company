
import { useState } from 'react';
import { ServiceProvider, ProviderStatus } from '@/types/provider';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Power } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface ProvidersListProps {
  providers: ServiceProvider[];
  onSelectProvider: (id: string) => void;
  onToggleStatus: (id: string, status: ProviderStatus) => void;
}

export function ProvidersList({ providers, onSelectProvider, onToggleStatus }: ProvidersListProps) {
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

  const getAvailabilityBadge = (status: 'online' | 'offline', lastSeen: string) => {
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
  };

  const toggleStatus = (provider: ServiceProvider) => {
    const newStatus = provider.status === 'active' ? 'paused' : 'active';
    onToggleStatus(provider.id, newStatus);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Service Types</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No providers found
              </TableCell>
            </TableRow>
          ) : (
            providers.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">{provider.fullName}</TableCell>
                <TableCell>{provider.region}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {provider.serviceTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {getAvailabilityBadge(provider.availabilityStatus, provider.lastSeen)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(provider.status) as any}>
                    {getFormattedStatus(provider.status)}
                  </Badge>
                </TableCell>
                <TableCell>{provider.commissionPercentage}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onSelectProvider(provider.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={provider.status === 'active' ? 'default' : 'secondary'} 
                      size="icon"
                      onClick={() => toggleStatus(provider)}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
