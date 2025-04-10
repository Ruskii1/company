
export type ProviderStatus = 'active' | 'pending_review' | 'suspended' | 'paused' | 'blacklisted' | 'deleted';
export type AvailabilityStatus = 'online' | 'offline';

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  isPrimary: boolean;
}

export interface Document {
  id: string;
  type: 'national_id' | 'drivers_license' | 'vehicle_registration' | 'equipment' | 'truck' | 'insurance' | 'operational_license' | 'other';
  url: string;
  description: string;
  uploadedAt: string;
  status: 'verified' | 'pending' | 'rejected';
}

export interface ProviderTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'payment' | 'commission' | 'refund' | 'bonus';
  status: 'completed' | 'pending' | 'failed';
  description: string;
  reference: string;
}

export interface ProviderOrder {
  id: string;
  taskId: string;
  date: string;
  serviceType: string;
  status: string;
  amount: number;
  customerName: string;
}

export interface ActionLogEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: {
    id: string;
    name: string;
    role: string;
  };
  details: string;
}

export interface InternalNote {
  id: string;
  text: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
}

export interface ServiceProvider {
  id: string;
  fullName: string;
  profilePhoto: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  company: string | null;
  region: string;
  serviceTypes: string[];
  status: ProviderStatus;
  availabilityStatus: AvailabilityStatus;
  lastSeen: string;
  commissionPercentage: number;
  bankAccounts: BankAccount[];
  documents: Document[];
  orders: ProviderOrder[];
  transactions: ProviderTransaction[];
  actionLog: ActionLogEntry[];
  internalNotes: InternalNote[];
  createdAt: string;
  isApproved: boolean;
}
