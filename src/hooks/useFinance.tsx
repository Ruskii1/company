import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Invoice, 
  Payment, 
  CancellationFee, 
  FinancialSummary,
  CustomerSpending,
  ServiceTypeRevenue,
  MonthlyRevenue
} from '@/types/finance';
import { toast } from '@/hooks/use-toast';

export const useFinance = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [cancellationFees, setCancellationFees] = useState<CancellationFee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      // In a real app, we would fetch from Supabase
      // For now, generate mock data locally
      const mockInvoices = generateMockInvoices();
      const mockPayments = generateMockPayments(mockInvoices);
      const mockCancellationFees = generateMockCancellationFees();
      
      setInvoices(mockInvoices);
      setPayments(mockPayments);
      setCancellationFees(mockCancellationFees);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching finance data:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: `Failed to load finance data: ${err.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Generate mock invoices
  const generateMockInvoices = (): Invoice[] => {
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
  const generateMockPayments = (invoices: Invoice[]): Payment[] => {
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
  const generateMockCancellationFees = (): CancellationFee[] => {
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
  
  // Calculate financial summary
  const getFinancialSummary = (): FinancialSummary => {
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid').length;
    const unpaidInvoices = invoices.filter(inv => inv.status === 'Unpaid').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue').length;
    const totalTax = invoices.reduce((sum, inv) => sum + inv.taxAmount, 0);
    const totalCancellationFees = cancellationFees.reduce((sum, fee) => sum + fee.amount, 0);
    
    return {
      totalRevenue,
      paidInvoices,
      unpaidInvoices,
      overdueInvoices,
      totalTax,
      cancellationFees: totalCancellationFees
    };
  };
  
  // Get top spending customers
  const getTopCustomers = (limit: number = 5): CustomerSpending[] => {
    const customerSpending = new Map<string, { total: number, count: number }>();
    
    invoices.forEach(inv => {
      const current = customerSpending.get(inv.customerName) || { total: 0, count: 0 };
      customerSpending.set(inv.customerName, {
        total: current.total + inv.amount,
        count: current.count + 1
      });
    });
    
    return Array.from(customerSpending.entries())
      .map(([customerName, data]) => ({
        customerName,
        totalSpent: data.total,
        invoiceCount: data.count
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit);
  };
  
  // Get revenue by service type
  const getRevenueByServiceType = (): ServiceTypeRevenue[] => {
    const serviceRevenue = new Map<string, { revenue: number, count: number }>();
    
    invoices.forEach(inv => {
      const current = serviceRevenue.get(inv.serviceType) || { revenue: 0, count: 0 };
      serviceRevenue.set(inv.serviceType, {
        revenue: current.revenue + inv.amount,
        count: current.count + 1
      });
    });
    
    return Array.from(serviceRevenue.entries())
      .map(([serviceType, data]) => ({
        serviceType,
        revenue: data.revenue,
        count: data.count
      }))
      .sort((a, b) => b.revenue - a.revenue);
  };
  
  // Get monthly revenue
  const getMonthlyRevenue = (limit: number = 12): MonthlyRevenue[] => {
    const monthlyData = new Map<string, number>();
    
    invoices.forEach(inv => {
      const monthYear = `${inv.issueDate.getFullYear()}-${String(inv.issueDate.getMonth() + 1).padStart(2, '0')}`;
      const current = monthlyData.get(monthYear) || 0;
      monthlyData.set(monthYear, current + inv.amount);
    });
    
    return Array.from(monthlyData.entries())
      .map(([month, revenue]) => ({
        month,
        revenue
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-limit);
  };
  
  // Filter invoices
  const filterInvoices = (filters: {
    orderNumber?: string;
    invoiceNumber?: string;
    customerName?: string;
    providerName?: string;
    month?: string;
    status?: string;
  }) => {
    return invoices.filter(inv => {
      if (filters.orderNumber && !inv.orderId.toLowerCase().includes(filters.orderNumber.toLowerCase())) {
        return false;
      }
      if (filters.invoiceNumber && !inv.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())) {
        return false;
      }
      if (filters.customerName && !inv.customerName.toLowerCase().includes(filters.customerName.toLowerCase())) {
        return false;
      }
      if (filters.providerName && !inv.providerName.toLowerCase().includes(filters.providerName.toLowerCase())) {
        return false;
      }
      if (filters.month) {
        const invoiceMonth = `${inv.issueDate.getFullYear()}-${String(inv.issueDate.getMonth() + 1).padStart(2, '0')}`;
        if (invoiceMonth !== filters.month) {
          return false;
        }
      }
      if (filters.status && inv.status !== filters.status) {
        return false;
      }
      return true;
    });
  };
  
  // Download invoice as PDF
  const downloadInvoice = (invoice: Invoice, type: 'Company' | 'Provider' | 'Client') => {
    // Mock implementation - in a real app this would generate a PDF
    toast({
      title: "Invoice Downloaded",
      description: `${type} invoice ${invoice.invoiceNumber} has been downloaded`,
    });
    console.log(`Downloaded ${type} invoice:`, invoice);
  };
  
  // Send invoice via email
  const sendInvoiceEmail = async (invoice: Invoice, email: string) => {
    // Mock implementation - in a real app this would send an email
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoice.invoiceNumber} has been sent to ${email}`,
    });
    console.log(`Sent invoice to ${email}:`, invoice);
    return true;
  };
  
  useEffect(() => {
    fetchFinanceData();
  }, []);
  
  return {
    invoices,
    payments,
    cancellationFees,
    loading,
    error,
    fetchFinanceData,
    getFinancialSummary,
    getTopCustomers,
    getRevenueByServiceType,
    getMonthlyRevenue,
    filterInvoices,
    downloadInvoice,
    sendInvoiceEmail
  };
};
