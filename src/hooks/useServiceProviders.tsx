
import { ProviderFilters, useProviderActions } from './providers/providerActions';
import { ServiceProvider, InternalNote, BankAccount, Document } from '@/types/provider';

export const useServiceProviders = () => {
  const {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    addDocument,
    filterProviders,
    resetFilters
  } = useProviderActions();

  return {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    addDocument,
    filterProviders,
    resetFilters
  };
};
