
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore, translations } from '@/lib/i18n';

interface ServiceTypeBadgesProps {
  serviceTypes: string[];
}

export function ServiceTypeBadges({ serviceTypes }: ServiceTypeBadgesProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  return (
    <div className="flex flex-wrap gap-1">
      {serviceTypes.map((type, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {t.services[type] || type}
        </Badge>
      ))}
    </div>
  );
}
