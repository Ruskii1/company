
import { ProviderFilters, useProviderActions } from './providers/providerActions';
import { ServiceProvider, InternalNote, BankAccount } from '@/types/provider';

export const useServiceProviders = () => {
  const {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    filterProviders,
    resetFilters
  } = useProviderActions();

  return {
    providers,
    allProviders,
    addInternalNote,
    addBankAccount,
    filterProviders,
    resetFilters
  };
};
