
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useServiceProviders } from '@/hooks/useServiceProviders';
import { ServiceProvider } from '@/types/provider';
import { useLanguageStore, translations } from '@/lib/i18n';
import MapControls from './map/MapControls';
import MapLegend from './map/MapLegend';
import MapContainer from './map/MapContainer';

const ProvidersMap = () => {
  const { allProviders } = useServiceProviders();
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [filter, setFilter] = useState({
    status: 'all',
    search: '',
    serviceType: 'all',
  });
  const { language } = useLanguageStore();
  const t = translations[language];

  // Get unique service types from providers
  const serviceTypes = Array.from(
    new Set(allProviders.flatMap(provider => provider.serviceTypes))
  );

  // Filter providers based on user selections
  useEffect(() => {
    let result = [...allProviders];
    
    if (filter.status !== 'all') {
      result = result.filter(provider => 
        filter.status === 'online' 
          ? provider.availabilityStatus === 'online'
          : provider.availabilityStatus === 'offline'
      );
    }
    
    if (filter.serviceType !== 'all') {
      result = result.filter(provider => 
        provider.serviceTypes.includes(filter.serviceType)
      );
    }
    
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(provider => 
        provider.fullName.toLowerCase().includes(searchLower) ||
        provider.phoneNumber.includes(filter.search)
      );
    }
    
    setFilteredProviders(result);
  }, [allProviders, filter]);

  return (
    <Card className="w-full h-[calc(100vh-150px)]">
      <CardContent className="p-0 relative">
        {/* Controls overlay */}
        <MapControls 
          filter={filter} 
          setFilter={setFilter} 
          serviceTypes={serviceTypes} 
        />
        
        {/* Map legend */}
        <MapLegend filteredProviders={filteredProviders} />
        
        {/* Map container */}
        <MapContainer filteredProviders={filteredProviders} />
      </CardContent>
    </Card>
  );
};

export default ProvidersMap;
