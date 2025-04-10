
import { ServiceProvider } from '@/types/provider';
import { ProviderFilters } from '../types';

export const filterProviders = (providers: ServiceProvider[], filters: ProviderFilters): ServiceProvider[] => {
  let results = [...providers];
  
  if (filters.name) {
    results = results.filter(provider => 
      provider.fullName.toLowerCase().includes(filters.name!.toLowerCase())
    );
  }
  
  if (filters.region) {
    results = results.filter(provider => 
      provider.region.toLowerCase().includes(filters.region!.toLowerCase())
    );
  }
  
  if (filters.phone) {
    results = results.filter(provider => 
      provider.phoneNumber.includes(filters.phone!)
    );
  }
  
  if (filters.serviceType) {
    results = results.filter(provider => 
      provider.serviceTypes.some(type => 
        type.toLowerCase().includes(filters.serviceType!.toLowerCase())
      )
    );
  }
  
  if (filters.status) {
    results = results.filter(provider => provider.status === filters.status);
  }
  
  return results;
};

export const resetFilters = (): void => {
  // This is just a placeholder since the actual reset is now done in the main hook
  return;
};
