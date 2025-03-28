
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
      // Fetch invoices
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .order('issue_date', { ascending: false });
      
      if (invoicesError) throw new Error(`Error fetching invoices: ${invoicesError.message}`);
      
      // Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*');
      
      if (paymentsError) throw new Error(`Error fetching payments: ${paymentsError.message}`);
      
      // Fetch cancellation fees
      const { data: feesData, error: feesError } = await supabase
        .from('cancellation_fees')
        .select('*')
        .order('charged_at', { ascending: false });
      
      if (feesError) throw new Error(`Error fetching cancellation fees: ${feesError.message}`);
      
      // Transform data to match our types
      const transformedInvoices: Invoice[] = invoicesData.map(inv => ({
        id: inv.id,
        orderId: inv.order_id,
        invoiceNumber: inv.invoice_number,
        customerName: inv.customer_name,
        providerName: inv.provider_name,
        serviceType: inv.service_type,
        amount: Number(inv.amount),
        taxAmount: Number(inv.tax_amount),
        issueDate: new Date(inv.issue_date),
        dueDate: new Date(inv.due_date),
        status: inv.status as 'Paid' | 'Unpaid' | 'Overdue',
        createdAt: new Date(inv.created_at)
      }));
      
      const transformedPayments: Payment[] = paymentsData.map(pay => ({
        id: pay.id,
        invoiceId: pay.invoice_id,
        amount: Number(pay.amount),
        paymentDate: new Date(pay.payment_date),
        paymentMethod: pay.payment_method,
        createdAt: new Date(pay.created_at)
      }));
      
      const transformedFees: CancellationFee[] = feesData.map(fee => ({
        id: fee.id,
        orderId: fee.order_id,
        customerName: fee.customer_name,
        amount: Number(fee.amount),
        reason: fee.reason,
        chargedAt: new Date(fee.charged_at),
        createdAt: new Date(fee.created_at)
      }));
      
      setInvoices(transformedInvoices);
      setPayments(transformedPayments);
      setCancellationFees(transformedFees);
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
