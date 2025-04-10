
import { useState } from 'react';
import { ServiceProvider, ProviderStatus, InternalNote, BankAccount, Document } from '@/types/provider';
import { mockServiceProviders } from '@/data/mockProviders';
import { filterProviders as filterProvidersUtil, resetFilters as resetFiltersUtil } from './utils/filterUtils';
import { updateProviderStatus, approveProvider } from './utils/statusUtils';
import { addInternalNote, addBankAccount, addDocument } from './utils/providerDataUtils';
import { ProviderFilters } from './types';

// Export the type correctly with 'export type'
export type { ProviderFilters } from './types';

export const useProviderActions = (initialProviders: ServiceProvider[] = mockServiceProviders) => {
  const [providers, setProviders] = useState<ServiceProvider[]>(initialProviders);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(initialProviders);

  // Status management functions
  const handleUpdateProviderStatus = (providerId: string, status: ProviderStatus) => {
    const { updatedProviders, updatedFiltered } = updateProviderStatus(
      providers, 
      filteredProviders, 
      providerId, 
      status
    );
    
    setProviders(updatedProviders);
    setFilteredProviders(updatedFiltered);
  };

  const handleApproveProvider = (providerId: string, isApproved: boolean) => {
    const { updatedProviders, updatedFiltered } = approveProvider(
      providers, 
      filteredProviders, 
      providerId, 
      isApproved
    );
    
    setProviders(updatedProviders);
    setFilteredProviders(updatedFiltered);
  };

  // Provider data management functions
  const handleAddInternalNote = (providerId: string, note: InternalNote) => {
    const { updatedProviders, updatedFiltered } = addInternalNote(
      providers, 
      filteredProviders, 
      providerId, 
      note
    );
    
    setProviders(updatedProviders);
    setFilteredProviders(updatedFiltered);
  };

  const handleAddBankAccount = (providerId: string, account: BankAccount) => {
    const { updatedProviders, updatedFiltered } = addBankAccount(
      providers, 
      filteredProviders, 
      providerId, 
      account
    );
    
    setProviders(updatedProviders);
    setFilteredProviders(updatedFiltered);
  };

  const handleAddDocument = (providerId: string, document: Document) => {
    const { updatedProviders, updatedFiltered } = addDocument(
      providers, 
      filteredProviders, 
      providerId, 
      document
    );
    
    setProviders(updatedProviders);
    setFilteredProviders(updatedFiltered);
  };

  // Filter functions
  const handleFilterProviders = (filters: ProviderFilters) => {
    const results = filterProvidersUtil(providers, filters);
    setFilteredProviders(results);
  };

  const handleResetFilters = () => {
    setFilteredProviders(providers);
  };

  return {
    providers: filteredProviders,
    allProviders: providers,
    updateProviderStatus: handleUpdateProviderStatus,
    approveProvider: handleApproveProvider,
    addInternalNote: handleAddInternalNote,
    addBankAccount: handleAddBankAccount,
    addDocument: handleAddDocument,
    filterProviders: handleFilterProviders,
    resetFilters: handleResetFilters
  };
};
