
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
}
