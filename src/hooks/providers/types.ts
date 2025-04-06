
import { ProviderStatus, ServiceProvider } from '@/types/provider';

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

export type DocumentType = 'national_id' | 'drivers_license' | 'vehicle_registration' | 'equipment' | 'truck' | 'insurance' | 'operational_license' | 'other';
