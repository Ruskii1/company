
import { ProviderStatus } from '@/types/provider';
import { ServiceProvider } from '@/types/provider';

export interface ProviderFilters {
  name?: string;
  region?: string;
  phone?: string;
  serviceType?: string;
  status?: ProviderStatus;
}

export interface ProviderStateUpdate {
  updatedProviders: ServiceProvider[];
  updatedFiltered: ServiceProvider[];
}
