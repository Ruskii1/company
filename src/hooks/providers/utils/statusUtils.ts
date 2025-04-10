
import { ServiceProvider, ProviderStatus } from '@/types/provider';
import { ProviderStateUpdate } from '../types';
import { createActionLogEntry } from './logUtils';

export const updateProviderStatus = (
  providers: ServiceProvider[],
  filteredProviders: ServiceProvider[],
  providerId: string,
  status: ProviderStatus
): ProviderStateUpdate => {
  const updatedProviders = providers.map(provider => 
    provider.id === providerId ? { ...provider, status } : provider
  );
  
  const updatedFiltered = filteredProviders.map(provider => 
    provider.id === providerId ? { ...provider, status } : provider
  );
  
  return { updatedProviders, updatedFiltered };
};

export const approveProvider = (
  providers: ServiceProvider[],
  filteredProviders: ServiceProvider[],
  providerId: string, 
  isApproved: boolean
): ProviderStateUpdate => {
  const actionEntry = createActionLogEntry(
    isApproved ? 'Provider Approved' : 'Provider Approval Revoked',
    {
      id: 'emp-001',
      name: 'Fatima Al-Sulaiman',
      role: 'Provider Manager'
    },
    isApproved 
      ? 'Provider account has been approved' 
      : 'Provider approval has been revoked'
  );

  const updatedProviders = providers.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          isApproved,
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  const updatedFiltered = filteredProviders.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          isApproved,
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  return { updatedProviders, updatedFiltered };
};
