
export interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  customerName: string;
  providerName: string;
  serviceType: string;
  amount: number;
  taxAmount: number;
  issueDate: Date;
  dueDate: Date;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  createdAt: Date;
  
  // Additional fields for Saudi e-invoicing format
  isBillable: boolean;
  corporateName?: string;
  pickupLocation: string;
  dropoffLocation: string;
  orderStartTime: Date;
  orderCompletionTime: Date;
  baseServiceFee: number;
  distanceCost: number;
  providerPhone: string;
  providerCompany?: string;
  amountDueToProvider: number;
  providerBonus?: number;
  lastModifiedAt: Date;
  markedBillableBy?: string;
  internalNotes?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  createdAt: Date;
}

export interface CancellationFee {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  reason: string | null;
  chargedAt: Date;
  createdAt: Date;
}

export interface FinancialSummary {
  totalRevenue: number;
  paidInvoices: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  totalTax: number;
  cancellationFees: number;
}

export interface CustomerSpending {
  customerName: string;
  totalSpent: number;
  invoiceCount: number;
}

export interface ServiceTypeRevenue {
  serviceType: string;
  revenue: number;
  count: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export type InvoiceType = 'Company' | 'Provider' | 'Client';

// Invoice section types for the detailed view
export type InvoiceSection = 
  | 'Invoice Details' 
  | 'Order Information' 
  | 'Order Charges Breakdown' 
  | 'Service Provider Information' 
  | 'Invoice Activity Log';

export interface InvoiceField {
  name: string;
  value: string | number | boolean | Date | null;
  editable: boolean;
  editableBy: 'System' | 'Admin/Authorized Employee' | 'Admin Only';
}
