
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { ProviderLiveMap } from '@/components/customer/ProviderLiveMap';

interface LocationDisplayProps {
  providerId: string;
  providerName: string;
}

export function LocationDisplay({ providerId, providerName }: LocationDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Current Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ProviderLiveMap 
          providerId={providerId}
          providerName={providerName}
        />
      </CardContent>
    </Card>
  );
}
