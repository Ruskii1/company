
import { ProviderFilters, useProviderActions } from './providers/providerActions';
import { ServiceProvider, InternalNote, BankAccount, Document } from '@/types/provider';

export const useServiceProviders = () => {
  const {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    addDocument,
    approveProvider,
    filterProviders,
    resetFilters
  } = useProviderActions();

  return {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    addDocument,
    approveProvider,
    filterProviders,
    resetFilters
  };
};
