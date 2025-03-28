
import { 
  Invoice, 
  Payment, 
  CancellationFee 
} from '@/types/finance';

// Generate mock invoices
export const generateMockInvoices = (): Invoice[] => {
  const serviceTypes = [
    'Car Towing', 
    'Battery Replacement', 
    'Tire Change', 
    'Fuel Delivery', 
    'Lockout Service',
    'Emergency Repair'
  ];
  const statuses: ('Paid' | 'Unpaid' | 'Overdue')[] = ['Paid', 'Unpaid', 'Overdue'];
  const customers = [
    'Ahmed Al-Mansour', 
    'Fatima Khalid', 
    'Mohammed Al-Harbi', 
    'Layla Al-Otaibi', 
    'Omar Al-Qahtani',
    'Nora Al-Saud',
    'Saeed Al-Ghamdi',
    'Aisha Al-Zahrani'
  ];
  const providers = [
    'RoadStar Services', 
    'Quick Fix Auto', 
    'Premium Roadside Co.', 
    'Elite Automotive', 
    'Royal Assistance',
    'Desert Rescue'
  ];
  
  const result: Invoice[] = [];
  
  // Generate invoices over the past 12 months
  for (let i = 0; i < 120; i++) {
    const issueDate = new Date();
    issueDate.setMonth(issueDate.getMonth() - Math.floor(Math.random() * 12));
    issueDate.setDate(Math.floor(Math.random() * 28) + 1);
    
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30);
    
    const amount = Math.floor(Math.random() * 400) + 100;
    const taxAmount = Math.round(amount * 0.15 * 100) / 100;
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    result.push({
      id: `inv-${i + 1000}`,
      orderId: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      invoiceNumber: `INV-${2023}-${(i + 1000).toString().padStart(4, '0')}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      providerName: providers[Math.floor(Math.random() * providers.length)],
      serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
      amount: amount,
      taxAmount: taxAmount,
      issueDate: issueDate,
      dueDate: dueDate,
      status: status,
      createdAt: new Date(issueDate.getTime() - Math.floor(Math.random() * 86400000))
    });
  }
  
  return result;
};

// Generate mock payments based on invoices
export const generateMockPayments = (invoices: Invoice[]): Payment[] => {
  const paymentMethods = ['Credit Card', 'Bank Transfer', 'Cash', 'Digital Wallet'];
  const result: Payment[] = [];
  
  // Create payments for all paid invoices
  invoices.filter(inv => inv.status === 'Paid').forEach((invoice, index) => {
    const paymentDate = new Date(invoice.issueDate);
    paymentDate.setDate(paymentDate.getDate() + Math.floor(Math.random() * 10));
    
    result.push({
      id: `pay-${index + 1000}`,
      invoiceId: invoice.id,
      amount: invoice.amount,
      paymentDate: paymentDate,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      createdAt: paymentDate
    });
  });
  
  return result;
};

// Generate mock cancellation fees
export const generateMockCancellationFees = (): CancellationFee[] => {
  const customers = [
    'Ahmed Al-Mansour', 
    'Fatima Khalid', 
    'Mohammed Al-Harbi', 
    'Layla Al-Otaibi', 
    'Omar Al-Qahtani',
    'Nora Al-Saud'
  ];
  
  const reasons = [
    'Service cancelled after provider dispatched',
    'Late cancellation',
    'No-show',
    'Service request cancelled on arrival',
    null
  ];
  
  const result: CancellationFee[] = [];
  
  // Generate 15 cancellation fees
  for (let i = 0; i < 15; i++) {
    const chargedDate = new Date();
    chargedDate.setMonth(chargedDate.getMonth() - Math.floor(Math.random() * 6));
    chargedDate.setDate(Math.floor(Math.random() * 28) + 1);
    
    const amount = Math.floor(Math.random() * 100) + 50;
    
    result.push({
      id: `fee-${i + 1000}`,
      orderId: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      amount: amount,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      chargedAt: chargedDate,
      createdAt: new Date(chargedDate.getTime() - 3600000)
    });
  }
  
  return result;
};
