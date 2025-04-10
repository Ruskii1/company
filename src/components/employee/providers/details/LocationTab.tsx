
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { ProviderLiveMap } from '@/components/customer/ProviderLiveMap';
import { LocationSimulator } from '../LocationSimulator';

interface LocationTabProps {
  providerId: string;
  providerName: string;
}

export function LocationTab({ providerId, providerName }: LocationTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Provider Live Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProviderLiveMap 
            providerId={providerId}
            providerName={providerName}
          />
        </CardContent>
      </Card>
      
      <LocationSimulator providerId={providerId} />
    </div>
  );
}
