
import { ServiceProvider } from '@/types/provider';

// Dummy service providers data
export const mockServiceProviders: ServiceProvider[] = [
  {
    id: 'prov-001',
    fullName: 'Ahmed Al-Malki',
    profilePhoto: '/placeholder.svg',
    phoneNumber: '+966 55 123 4567',
    email: 'ahmed.m@provider.com',
    nationalId: '1037659281',
    company: null,
    region: 'Riyadh',
    serviceTypes: ['Airport Transfer', 'City Tour', 'Chauffeur'],
    status: 'active',
    availabilityStatus: 'online',
    lastSeen: new Date().toISOString(),
    commissionPercentage: 3.5,
    bankAccounts: [
      {
        id: 'bank-001',
        bankName: 'Al Rajhi Bank',
        accountNumber: '0987654321',
        iban: 'SA03 8000 0000 6080 1016 7519',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: 'doc-001',
        type: 'national_id',
        url: '/placeholder.svg',
        description: 'National ID front and back',
        uploadedAt: '2023-06-15T10:30:00',
        status: 'verified'
      },
      {
        id: 'doc-002',
        type: 'drivers_license',
        url: '/placeholder.svg',
        description: 'Saudi driving license',
        uploadedAt: '2023-06-15T10:35:00',
        status: 'verified'
      },
      {
        id: 'doc-003',
        type: 'vehicle_registration',
        url: '/placeholder.svg',
        description: 'Vehicle registration for Toyota Camry 2022',
        uploadedAt: '2023-06-15T10:40:00',
        status: 'verified'
      },
      {
        id: 'doc-004',
        type: 'truck',
        url: '/placeholder.svg',
        description: 'Vehicle front view',
        uploadedAt: '2023-06-15T10:45:00',
        status: 'verified'
      }
    ],
    orders: [
      {
        id: 'ord-001',
        taskId: 'T100123',
        date: '2023-10-15T09:30:00',
        serviceType: 'Airport Transfer',
        status: 'Completed',
        amount: 150.00,
        customerName: 'Sarah Johnson'
      },
      {
        id: 'ord-002',
        taskId: 'T100125',
        date: '2023-10-17T13:00:00',
        serviceType: 'City Tour',
        status: 'In service',
        amount: 300.00,
        customerName: 'Mohammed Al-Fahad'
      }
    ],
    transactions: [
      {
        id: 'trans-001',
        date: '2023-10-16T10:00:00',
        amount: 145.50,
        type: 'payment',
        status: 'completed',
        description: 'Payment for task T100123',
        reference: 'PAY-123456'
      },
      {
        id: 'trans-002',
        date: '2023-10-16T10:05:00',
        amount: 4.50,
        type: 'commission',
        status: 'completed',
        description: 'Commission for task T100123',
        reference: 'COM-123456'
      }
    ],
    actionLog: [
      {
        id: 'log-001',
        timestamp: '2023-06-15T11:00:00',
        action: 'Account Approved',
        performedBy: {
          id: 'emp-001',
          name: 'Fatima Al-Sulaiman',
          role: 'Provider Manager'
        },
        details: 'Provider account approved after document verification'
      },
      {
        id: 'log-002',
        timestamp: '2023-10-15T09:35:00',
        action: 'Order Assigned',
        performedBy: {
          id: 'sys-001',
          name: 'System',
          role: 'System'
        },
        details: 'Order T100123 assigned to provider'
      }
    ],
    internalNotes: [
      {
        id: 'note-001',
        text: 'Provider has excellent customer feedback and reliability.',
        createdAt: '2023-08-20T14:30:00',
        createdBy: {
          id: 'emp-002',
          name: 'Khaled Al-Otaibi',
          role: 'Operations Manager'
        }
      }
    ],
    createdAt: '2023-06-15T09:00:00'
  },
  {
    id: 'prov-002',
    fullName: 'Noor Al-Qahtani',
    profilePhoto: '/placeholder.svg',
    phoneNumber: '+966 55 987 6543',
    email: 'noor.q@provider.com',
    nationalId: '1048756392',
    company: 'Elite Transport Co.',
    region: 'Jeddah',
    serviceTypes: ['Airport Transfer', 'Inter-city Travel', 'VIP Service'],
    status: 'active',
    availabilityStatus: 'offline',
    lastSeen: '2023-10-17T15:45:00',
    commissionPercentage: 4.0,
    bankAccounts: [
      {
        id: 'bank-002',
        bankName: 'Saudi National Bank',
        accountNumber: '1234567890',
        iban: 'SA44 1000 0000 1234 5678 9012',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: 'doc-005',
        type: 'national_id',
        url: '/placeholder.svg',
        description: 'National ID front and back',
        uploadedAt: '2023-07-10T11:30:00',
        status: 'verified'
      },
      {
        id: 'doc-006',
        type: 'drivers_license',
        url: '/placeholder.svg',
        description: 'Saudi driving license',
        uploadedAt: '2023-07-10T11:35:00',
        status: 'verified'
      }
    ],
    orders: [
      {
        id: 'ord-003',
        taskId: 'T100124',
        date: '2023-10-16T14:00:00',
        serviceType: 'VIP Service',
        status: 'Completed',
        amount: 500.00,
        customerName: 'Abdullah Al-Shahrani'
      }
    ],
    transactions: [
      {
        id: 'trans-003',
        date: '2023-10-17T09:00:00',
        amount: 480.00,
        type: 'payment',
        status: 'completed',
        description: 'Payment for task T100124',
        reference: 'PAY-234567'
      },
      {
        id: 'trans-004',
        date: '2023-10-17T09:05:00',
        amount: 20.00,
        type: 'commission',
        status: 'completed',
        description: 'Commission for task T100124',
        reference: 'COM-234567'
      }
    ],
    actionLog: [
      {
        id: 'log-003',
        timestamp: '2023-07-10T12:00:00',
        action: 'Account Approved',
        performedBy: {
          id: 'emp-001',
          name: 'Fatima Al-Sulaiman',
          role: 'Provider Manager'
        },
        details: 'Provider account approved after document verification'
      }
    ],
    internalNotes: [
      {
        id: 'note-002',
        text: 'Provider specializes in VIP services with luxury vehicles. Excellent English skills.',
        createdAt: '2023-09-05T10:15:00',
        createdBy: {
          id: 'emp-003',
          name: 'Mohammed Al-Harbi',
          role: 'Customer Relations'
        }
      }
    ],
    createdAt: '2023-07-10T10:00:00'
  },
  {
    id: 'prov-003',
    fullName: 'Saad Al-Ghamdi',
    profilePhoto: '/placeholder.svg',
    phoneNumber: '+966 55 456 7890',
    email: 'saad.g@provider.com',
    nationalId: '1059873214',
    company: null,
    region: 'Dammam',
    serviceTypes: ['Airport Transfer', 'City Tour'],
    status: 'pending_review',
    availabilityStatus: 'offline',
    lastSeen: '2023-10-17T12:30:00',
    commissionPercentage: 3.0,
    bankAccounts: [
      {
        id: 'bank-003',
        bankName: 'Riyad Bank',
        accountNumber: '5678901234',
        iban: 'SA05 2000 0000 5678 9012 3456',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: 'doc-007',
        type: 'national_id',
        url: '/placeholder.svg',
        description: 'National ID front and back',
        uploadedAt: '2023-10-15T13:30:00',
        status: 'pending'
      },
      {
        id: 'doc-008',
        type: 'drivers_license',
        url: '/placeholder.svg',
        description: 'Saudi driving license',
        uploadedAt: '2023-10-15T13:35:00',
        status: 'pending'
      }
    ],
    orders: [],
    transactions: [],
    actionLog: [
      {
        id: 'log-004',
        timestamp: '2023-10-15T14:00:00',
        action: 'Account Created',
        performedBy: {
          id: 'sys-001',
          name: 'System',
          role: 'System'
        },
        details: 'Provider registered through mobile app'
      }
    ],
    internalNotes: [
      {
        id: 'note-003',
        text: 'Need to verify vehicle documentation more closely before approval.',
        createdAt: '2023-10-16T09:45:00',
        createdBy: {
          id: 'emp-001',
          name: 'Fatima Al-Sulaiman',
          role: 'Provider Manager'
        }
      }
    ],
    createdAt: '2023-10-15T13:00:00'
  }
];
