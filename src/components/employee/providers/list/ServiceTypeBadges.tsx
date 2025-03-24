
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ServiceTypeBadgesProps {
  serviceTypes: string[];
}

export function ServiceTypeBadges({ serviceTypes }: ServiceTypeBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {serviceTypes.map((type, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {type}
        </Badge>
      ))}
    </div>
  );
}
