
import { ProviderCompany } from '@/types/corporate'
import { mockServiceProviders } from './mockProviders'

// Create groups of providers for each company
const providerGroups = [
  {
    companyId: 'comp-001',
    providerIds: ['prov-001', 'prov-003', 'prov-005']
  },
  {
    companyId: 'comp-002',
    providerIds: ['prov-002', 'prov-004', 'prov-006']
  },
  {
    companyId: 'comp-003',
    providerIds: ['prov-007', 'prov-008']
  },
  {
    companyId: 'comp-004',
    providerIds: ['prov-009', 'prov-010', 'prov-011', 'prov-012']
  }
]

// Generate mock provider companies
export const mockProviderCompanies: ProviderCompany[] = [
  {
    id: 'comp-001',
    name: 'Al-Faisal Transportation Services',
    contactPerson: 'Mohammed Al-Faisal',
    contactPosition: 'Operations Director',
    contactPhone: '+966 50 123 4567',
    contactEmail: 'mohammed@alfaisal-transport.com',
    email: 'info@alfaisal-transport.com',
    phone: '+966 11 234 5678',
    address: 'King Fahd Road, Riyadh, Saudi Arabia',
    registrationNumber: 'CR-1234567890',
    taxNumber: 'VAT-123456789012345',
    status: 'active',
    contractStartDate: '2022-01-01T00:00:00.000Z',
    contractEndDate: '2025-01-01T00:00:00.000Z',
    commissionRate: 15,
    providers: mockServiceProviders.filter(provider => 
      providerGroups.find(group => group.companyId === 'comp-001')?.providerIds.includes(provider.id)
    )
  },
  {
    id: 'comp-002',
    name: 'Najm Logistics',
    contactPerson: 'Fatima Al-Otaibi',
    contactPosition: 'CEO',
    contactPhone: '+966 55 987 6543',
    contactEmail: 'fatima@najm-logistics.com',
    email: 'contact@najm-logistics.com',
    phone: '+966 12 345 6789',
    address: 'Prince Sultan Street, Jeddah, Saudi Arabia',
    registrationNumber: 'CR-0987654321',
    taxNumber: 'VAT-098765432109876',
    status: 'active',
    contractStartDate: '2021-06-15T00:00:00.000Z',
    contractEndDate: '2024-06-15T00:00:00.000Z',
    commissionRate: 12.5,
    providers: mockServiceProviders.filter(provider => 
      providerGroups.find(group => group.companyId === 'comp-002')?.providerIds.includes(provider.id)
    )
  },
  {
    id: 'comp-003',
    name: 'Eastern Freight Solutions',
    contactPerson: 'Abdullah Al-Qahtani',
    contactPosition: 'Managing Director',
    contactPhone: '+966 56 456 7890',
    contactEmail: 'abdullah@eastern-freight.com',
    email: 'info@eastern-freight.com',
    phone: '+966 13 456 7890',
    address: 'King Abdulaziz Road, Dammam, Saudi Arabia',
    registrationNumber: 'CR-5678901234',
    taxNumber: 'VAT-567890123456789',
    status: 'pending',
    contractStartDate: '2023-03-01T00:00:00.000Z',
    contractEndDate: '2026-03-01T00:00:00.000Z',
    commissionRate: 18,
    providers: mockServiceProviders.filter(provider => 
      providerGroups.find(group => group.companyId === 'comp-003')?.providerIds.includes(provider.id)
    )
  },
  {
    id: 'comp-004',
    name: 'Al-Jazeera Transport & Logistics',
    contactPerson: 'Ibrahim Al-Zahrani',
    contactPosition: 'Operations Manager',
    contactPhone: '+966 54 321 0987',
    contactEmail: 'ibrahim@aljazeera-logistics.com',
    email: 'support@aljazeera-logistics.com',
    phone: '+966 14 567 8901',
    address: 'Prince Mohammed Bin Abdulaziz Street, Medina, Saudi Arabia',
    registrationNumber: 'CR-3456789012',
    taxNumber: 'VAT-345678901234567',
    status: 'expired',
    contractStartDate: '2020-11-15T00:00:00.000Z',
    contractEndDate: '2023-11-15T00:00:00.000Z',
    commissionRate: 14,
    providers: mockServiceProviders.filter(provider => 
      providerGroups.find(group => group.companyId === 'comp-004')?.providerIds.includes(provider.id)
    )
  }
]
