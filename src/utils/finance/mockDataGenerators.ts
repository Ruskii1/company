import { Invoice, Payment, CancellationFee } from '@/types/finance';

export const generateMockInvoices = (): Invoice[] => {
  const invoices: Invoice[] = [];
  
  // Generate 20 random invoices
  for (let i = 0; i < 20; i++) {
    const issueDate = new Date();
    issueDate.setDate(issueDate.getDate() - Math.floor(Math.random() * 60));
    
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30);
    
    const amount = Math.floor(Math.random() * 1000) + 100;
    const taxAmount = Math.floor(amount * 0.15); // 15% VAT
    
    const baseServiceFee = Math.floor(amount * 0.7);
    const distanceCost = amount - baseServiceFee;
    
    const amountDueToProvider = Math.floor(amount * 0.8);
    
    const orderStartTime = new Date(issueDate);
    orderStartTime.setHours(Math.floor(Math.random() * 12) + 8); // Between 8 AM and 8 PM
    
    const orderCompletionTime = new Date(orderStartTime);
    orderCompletionTime.setHours(orderCompletionTime.getHours() + Math.floor(Math.random() * 3) + 1); // 1-3 hours after start
    
    const isBillable = Math.random() > 0.2; // 80% are billable
    
    // Status is based on due date and a random factor
    let status: 'Paid' | 'Unpaid' | 'Overdue';
    if (dueDate < new Date()) {
      status = Math.random() > 0.5 ? 'Paid' : 'Overdue';
    } else {
      status = Math.random() > 0.7 ? 'Paid' : 'Unpaid';
    }
    
    const providerBonus = Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : undefined;
    const corporateName = Math.random() > 0.6 ? `Corp ${String.fromCharCode(65 + i % 26)}` : undefined;
    const providerCompany = Math.random() > 0.5 ? `Provider Company ${String.fromCharCode(65 + i % 26)}` : undefined;
    const markedBillableBy = isBillable ? `Employee ${String.fromCharCode(65 + i % 26)}` : undefined;
    const internalNotes = Math.random() > 0.6 ? `Some internal notes for invoice #INV-2023-${1000 + i}` : undefined;
    
    const createdAt = new Date(issueDate);
    createdAt.setHours(createdAt.getHours() - 2);
    
    const lastModifiedAt = new Date(createdAt);
    lastModifiedAt.setHours(lastModifiedAt.getHours() + Math.floor(Math.random() * 48));
    
    invoices.push({
      id: `inv-${i + 1}`,
      orderId: `ord-${1000 + i}`,
      invoiceNumber: `INV-2023-${1000 + i}`,
      customerName: `Customer ${String.fromCharCode(65 + i % 26)}`,
      providerName: `Provider ${String.fromCharCode(65 + i % 26)}`,
      serviceType: ['Taxi', 'Delivery', 'Moving', 'Roadside Assistance'][i % 4],
      amount,
      taxAmount,
      issueDate,
      dueDate,
      status,
      createdAt,
      
      // Additional Saudi e-invoicing fields
      isBillable,
      corporateName,
      pickupLocation: `Pickup Location ${i + 1}`,
      dropoffLocation: `Dropoff Location ${i + 1}`,
      orderStartTime,
      orderCompletionTime,
      baseServiceFee,
      distanceCost,
      providerPhone: `+966 5${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`,
      providerCompany,
      amountDueToProvider,
      providerBonus,
      lastModifiedAt,
      markedBillableBy,
      internalNotes
    });
  }
  
  return invoices;
};

export const generateMockPayments = (invoices: Invoice[]): Payment[] => {
  const payments: Payment[] = [];
  
  // Generate 3-5 payments for each invoice
  invoices.forEach(invoice => {
    const numPayments = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < numPayments; i++) {
      const amount = Math.floor(invoice.amount / numPayments);
      const paymentDate = new Date(invoice.issueDate);
      paymentDate.setDate(paymentDate.getDate() + Math.floor(Math.random() * 30));
      
      payments.push({
        id: `pay-${invoice.id}-${i + 1}`,
        invoiceId: invoice.id,
        amount,
        paymentDate,
        paymentMethod: ['Credit Card', 'Bank Transfer', 'Cash'][i % 3],
        createdAt: new Date()
      });
    }
  });
  
  return payments;
};

export const generateMockCancellationFees = (): CancellationFee[] => {
  const cancellationFees: CancellationFee[] = [];
  
  // Generate 10 random cancellation fees
  for (let i = 0; i < 10; i++) {
    const amount = Math.floor(Math.random() * 50) + 20;
    const chargedAt = new Date();
    chargedAt.setDate(chargedAt.getDate() - Math.floor(Math.random() * 90));
    
    cancellationFees.push({
      id: `cancel-${i + 1}`,
      orderId: `ord-${2000 + i}`,
      customerName: `Customer ${String.fromCharCode(65 + i % 26)}`,
      amount,
      reason: ['Customer Cancellation', 'Provider Cancellation', null][i % 3],
      chargedAt,
      createdAt: new Date()
    });
  }
  
  return cancellationFees;
};
