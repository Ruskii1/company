
import { ServiceProvider, InternalNote, BankAccount, Document } from '@/types/provider';
import { ProviderStateUpdate } from '../types';
import { createActionLogEntry } from './logUtils';

export const addInternalNote = (
  providers: ServiceProvider[],
  filteredProviders: ServiceProvider[],
  providerId: string, 
  note: InternalNote
): ProviderStateUpdate => {
  const actionEntry = createActionLogEntry(
    'Note Added',
    note.createdBy,
    'Internal note added to provider account'
  );

  const updatedProviders = providers.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          internalNotes: [note, ...provider.internalNotes],
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  const updatedFiltered = filteredProviders.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          internalNotes: [note, ...provider.internalNotes],
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  return { updatedProviders, updatedFiltered };
};

export const addBankAccount = (
  providers: ServiceProvider[],
  filteredProviders: ServiceProvider[],
  providerId: string, 
  account: BankAccount
): ProviderStateUpdate => {
  const actionEntry = createActionLogEntry(
    'Bank Account Added',
    {
      id: 'emp-001',
      name: 'Fatima Al-Sulaiman',
      role: 'Provider Manager'
    },
    `Bank account added: ${account.bankName}`
  );

  const updatedProviders = providers.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          bankAccounts: [...provider.bankAccounts, account],
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  const updatedFiltered = filteredProviders.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          bankAccounts: [...provider.bankAccounts, account],
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  return { updatedProviders, updatedFiltered };
};

export const addDocument = (
  providers: ServiceProvider[],
  filteredProviders: ServiceProvider[],
  providerId: string, 
  document: Document
): ProviderStateUpdate => {
  const actionEntry = createActionLogEntry(
    'Document Added',
    {
      id: 'emp-001',
      name: 'Fatima Al-Sulaiman',
      role: 'Provider Manager'
    },
    `Document uploaded: ${document.type}`
  );

  const updatedProviders = providers.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          documents: [...provider.documents, document],
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  const updatedFiltered = filteredProviders.map(provider => 
    provider.id === providerId 
      ? { 
          ...provider, 
          documents: [...provider.documents, document],
          actionLog: [actionEntry, ...provider.actionLog]
        } 
      : provider
  );
  
  return { updatedProviders, updatedFiltered };
};
