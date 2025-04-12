
import { useProviderActions } from './providers/providerActions';
import type { ProviderFilters } from './providers/types';
import type { ServiceProvider, InternalNote, BankAccount, Document, ProviderStatus } from '@/types/provider';

export { type ProviderFilters };

export const useServiceProviders = () => {
  const {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    addDocument,
    approveProvider,
    updateProviderStatus,
    filterProviders,
    resetFilters
  } = useProviderActions();

  // Function to search providers by multiple criteria
  const searchProviders = (
    query: string,
    criteria: ('name' | 'region' | 'phone' | 'serviceType')[] = ['name', 'region', 'phone', 'serviceType']
  ) => {
    if (!query) {
      return resetFilters();
    }

    const lowercaseQuery = query.toLowerCase();
    
    const searchResults = allProviders.filter(provider => {
      return criteria.some(criterion => {
        switch (criterion) {
          case 'name':
            return provider.fullName.toLowerCase().includes(lowercaseQuery);
          case 'region':
            return provider.region.toLowerCase().includes(lowercaseQuery);
          case 'phone':
            return provider.phoneNumber.toLowerCase().includes(lowercaseQuery);
          case 'serviceType':
            return provider.serviceTypes.some(type => 
              type.toLowerCase().includes(lowercaseQuery)
            );
          default:
            return false;
        }
      });
    });

    return searchResults;
  };

  return {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    addDocument,
    approveProvider,
    updateProviderStatus,
    filterProviders,
    resetFilters,
    searchProviders
  };
};
