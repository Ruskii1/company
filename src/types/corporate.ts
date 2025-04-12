
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
}

export interface CorporateRequest {
  id: string;
  taskId: string;
  serviceType: string;
  status: string;
  date: string;
  employeeName: string;
  pickupLocation: string;
  dropoffLocation: string;
  amount: number;
}

export interface CorporateTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  createdAt: string;
  createdBy: string;
  tags: string[];
}

export interface CorporateDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface CorporateAccount {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  accountBalance: number;
  employees: Employee[];
  requests: CorporateRequest[];
  tickets: CorporateTicket[];
  documents?: CorporateDocument[];
}

export interface ProviderCompany {
  id: string;
  name: string;
  contactPerson: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  taxNumber: string;
  status: 'active' | 'pending' | 'expired';
  contractStartDate: string;
  contractEndDate: string;
  commissionRate: number;
  providers: any[]; // Will be filled with ServiceProvider objects
}
