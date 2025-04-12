
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

  return {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    addDocument,
    approveProvider,
    updateProviderStatus,
    filterProviders,
    resetFilters
  };
};
