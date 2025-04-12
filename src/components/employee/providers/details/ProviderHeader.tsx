
import React from 'react';
import { ServiceProvider, ProviderStatus } from '@/types/provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { DetailsBadge } from '../list/DetailsBadge';
import { StatusSelector } from './StatusSelector';

interface ProviderHeaderProps {
  provider: ServiceProvider;
  onBack: () => void;
  onStatusChange?: (providerId: string, status: ProviderStatus) => void;
}

export function ProviderHeader({ provider, onBack, onStatusChange }: ProviderHeaderProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending_review':
        return 'secondary';
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

  const handleStatusChange = (status: ProviderStatus) => {
    if (onStatusChange) {
      onStatusChange(provider.id, status);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to providers list
        </Button>
        <div className="flex items-center gap-3">
          <Badge variant={getStatusBadgeVariant(provider.status) as any} className="text-sm py-1 px-3">
            {getFormattedStatus(provider.status)}
          </Badge>
          {onStatusChange && (
            <StatusSelector 
              currentStatus={provider.status} 
              onStatusChange={handleStatusChange} 
            />
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={provider.profilePhoto} alt={provider.fullName} />
            <AvatarFallback className="text-2xl">{provider.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-grow space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{provider.fullName}</h2>
            {provider.company && <p className="text-muted-foreground">Company: {provider.company}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{provider.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{provider.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{provider.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {new Date(provider.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>National ID: {provider.nationalId}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span>Commission: {provider.commissionPercentage}%</span>
            </div>
          </div>
          
          {/* Add the detailed status information */}
          <div className="mt-4">
            <DetailsBadge provider={provider} />
          </div>
        </div>
      </div>
    </>
  );
}
