import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useServiceProviders } from '@/hooks/useServiceProviders';
import { ServiceProvider } from '@/types/provider';
import MapControls from './map/MapControls';
import MapLegend from './map/MapLegend';
import MapContainer from './map/MapContainer';
import { serviceTypeValues } from '@/components/forms/ServiceTypeField';

const ProvidersMap = () => {
  const { allProviders } = useServiceProviders();
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [filter, setFilter] = useState({
    status: 'all',
    search: '',
    serviceType: 'all',
  });

  // Use standardized service types from ServiceTypeField
  const serviceTypes = serviceTypeValues;

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
    <Card className="w-full h-full overflow-hidden border-0 bg-transparent shadow-none">
      <CardContent className="p-0 relative h-full">
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
