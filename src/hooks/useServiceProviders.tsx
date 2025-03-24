
import { ProviderFilters, useProviderActions } from './providers/providerActions';
import { ServiceProvider, ProviderStatus, InternalNote, BankAccount } from '@/types/provider';

export const useServiceProviders = () => {
  const {
    providers,
    allProviders,
    updateProviderStatus,
    addInternalNote,
    addBankAccount,
    filterProviders,
    resetFilters
  } = useProviderActions();

  return {
    providers,
    allProviders,
    updateProviderStatus,
    addInternalNote,
    addBankAccount,
    filterProviders,
    resetFilters
  };
};
