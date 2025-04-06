
import { useState } from 'react';
import { ServiceProvider, ProviderStatus, InternalNote, BankAccount, Document } from '@/types/provider';
import { mockServiceProviders } from '@/data/mockProviders';

export interface ProviderFilters {
  name?: string;
  region?: string;
  phone?: string;
  serviceType?: string;
  status?: ProviderStatus;
}

export const useProviderActions = (initialProviders: ServiceProvider[] = mockServiceProviders) => {
  const [providers, setProviders] = useState<ServiceProvider[]>(initialProviders);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(initialProviders);

  const updateProviderStatus = (providerId: string, status: ProviderStatus) => {
    setProviders(prevProviders => 
      prevProviders.map(provider => 
        provider.id === providerId ? { ...provider, status } : provider
      )
    );
    
    setFilteredProviders(prevFiltered => 
      prevFiltered.map(provider => 
        provider.id === providerId ? { ...provider, status } : provider
      )
    );
  };

  const addInternalNote = (providerId: string, note: InternalNote) => {
    setProviders(prevProviders => 
      prevProviders.map(provider => 
        provider.id === providerId 
          ? { 
              ...provider, 
              internalNotes: [note, ...provider.internalNotes],
              actionLog: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  action: 'Note Added',
                  performedBy: note.createdBy,
                  details: 'Internal note added to provider account'
                },
                ...provider.actionLog
              ]
            } 
          : provider
      )
    );
    
    setFilteredProviders(prevFiltered => 
      prevFiltered.map(provider => 
        provider.id === providerId 
          ? { 
              ...provider, 
              internalNotes: [note, ...provider.internalNotes],
              actionLog: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  action: 'Note Added',
                  performedBy: note.createdBy,
                  details: 'Internal note added to provider account'
                },
                ...provider.actionLog
              ]
            } 
          : provider
      )
    );
  };

  const addBankAccount = (providerId: string, account: BankAccount) => {
    setProviders(prevProviders => 
      prevProviders.map(provider => 
        provider.id === providerId 
          ? { 
              ...provider, 
              bankAccounts: [...provider.bankAccounts, account],
              actionLog: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  action: 'Bank Account Added',
                  performedBy: {
                    id: 'emp-001',
                    name: 'Fatima Al-Sulaiman',
                    role: 'Provider Manager'
                  },
                  details: `Bank account added: ${account.bankName}`
                },
                ...provider.actionLog
              ]
            } 
          : provider
      )
    );
    
    setFilteredProviders(prevFiltered => 
      prevFiltered.map(provider => 
        provider.id === providerId 
          ? { 
              ...provider, 
              bankAccounts: [...provider.bankAccounts, account],
              actionLog: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  action: 'Bank Account Added',
                  performedBy: {
                    id: 'emp-001',
                    name: 'Fatima Al-Sulaiman',
                    role: 'Provider Manager'
                  },
                  details: `Bank account added: ${account.bankName}`
                },
                ...provider.actionLog
              ]
            } 
          : provider
      )
    );
  };

  const addDocument = (providerId: string, document: Document) => {
    setProviders(prevProviders => 
      prevProviders.map(provider => 
        provider.id === providerId 
          ? { 
              ...provider, 
              documents: [...provider.documents, document],
              actionLog: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  action: 'Document Added',
                  performedBy: {
                    id: 'emp-001',
                    name: 'Fatima Al-Sulaiman',
                    role: 'Provider Manager'
                  },
                  details: `Document uploaded: ${document.type}`
                },
                ...provider.actionLog
              ]
            } 
          : provider
      )
    );
    
    setFilteredProviders(prevFiltered => 
      prevFiltered.map(provider => 
        provider.id === providerId 
          ? { 
              ...provider, 
              documents: [...provider.documents, document],
              actionLog: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  action: 'Document Added',
                  performedBy: {
                    id: 'emp-001',
                    name: 'Fatima Al-Sulaiman',
                    role: 'Provider Manager'
                  },
                  details: `Document uploaded: ${document.type}`
                },
                ...provider.actionLog
              ]
            } 
          : provider
      )
    );
  };

  const filterProviders = (filters: ProviderFilters) => {
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
    
    setFilteredProviders(results);
  };

  const resetFilters = () => {
    setFilteredProviders(providers);
  };

  return {
    providers: filteredProviders,
    allProviders: providers,
    updateProviderStatus,
    addInternalNote,
    addBankAccount,
    addDocument,
    filterProviders,
    resetFilters
  };
};
