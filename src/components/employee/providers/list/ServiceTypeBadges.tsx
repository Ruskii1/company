
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore, translations } from '@/lib/i18n';

interface ServiceTypeBadgesProps {
  serviceTypes: string[];
}

export function ServiceTypeBadges({ serviceTypes }: ServiceTypeBadgesProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  // Color mapping for service types
  const getServiceTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      'regular-towing': 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-0',
      'motorcycle-towing': 'bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 border-0',
      'flatbed-towing': 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border-0',
      'heavy-duty-towing': 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-0',
      'battery-jumpstart': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400 border-0',
      'tire-change': 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-0',
      'fuel-delivery': 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-0',
      'lockout-assistance': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-0',
      'winching': 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-0',
    };
    
    return colorMap[type] || 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-0';
  };

  // If there are too many service types, show a limited number with a "+X more" indicator
  const MAX_VISIBLE = 2;
  const visibleTypes = serviceTypes.slice(0, MAX_VISIBLE);
  const extraCount = serviceTypes.length - MAX_VISIBLE;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleTypes.map((type) => (
        <Badge 
          key={type} 
          className={`font-normal text-xs px-2 ${getServiceTypeColor(type)}`}
          variant="outline"
        >
          {t.services[type] || type}
        </Badge>
      ))}
      
      {extraCount > 0 && (
        <Badge variant="outline" className="font-normal text-xs bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-0">
          +{extraCount} more
        </Badge>
      )}
    </div>
  );
}
