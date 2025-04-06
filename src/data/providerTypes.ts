
import { ServiceProvider } from '@/types/provider';

/**
 * Creates a new mock service provider with the given properties
 * @param props Properties to override in the default provider
 * @returns A complete ServiceProvider object
 */
export const createMockProvider = (props: Partial<ServiceProvider>): ServiceProvider => {
  return {
    id: 'prov-000',
    fullName: 'Mock Provider',
    profilePhoto: '/placeholder.svg',
    phoneNumber: '+966 55 000 0000',
    email: 'mock@provider.com',
    nationalId: '1000000000',
    company: null,
    region: 'Riyadh',
    serviceTypes: ['regular-towing', 'battery-jumpstart'],
    status: 'active',
    availabilityStatus: 'offline',
    lastSeen: new Date().toISOString(),
    commissionPercentage: 3.0,
    bankAccounts: [],
    documents: [],
    orders: [],
    transactions: [],
    actionLog: [],
    internalNotes: [],
    createdAt: new Date().toISOString(),
    isApproved: false,
    ...props
  };
};
