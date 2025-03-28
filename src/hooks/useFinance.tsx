
import { useState, useEffect } from 'react';
import { 
  Invoice, 
  Payment, 
  CancellationFee, 
  InvoiceType 
} from '@/types/finance';
import { toast } from '@/hooks/use-toast';
import { 
  generateMockInvoices,
  generateMockPayments,
  generateMockCancellationFees
} from '@/utils/finance/mockDataGenerators';
import {
  getFinancialSummary,
  getTopCustomers,
  getRevenueByServiceType,
  getMonthlyRevenue,
  filterInvoices
} from '@/utils/finance/financeAnalytics';
import {
  downloadInvoice as downloadInvoiceAction,
  sendInvoiceEmail as sendInvoiceEmailAction
} from '@/utils/finance/invoiceActions';

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
  
  // Wrapper functions that provide the current state
  const getFinancialSummaryData = () => {
    return getFinancialSummary(invoices, cancellationFees);
  };
  
  const getTopCustomersData = (limit: number = 5) => {
    return getTopCustomers(invoices, limit);
  };
  
  const getRevenueByServiceTypeData = () => {
    return getRevenueByServiceType(invoices);
  };
  
  const getMonthlyRevenueData = (limit: number = 12) => {
    return getMonthlyRevenue(invoices, limit);
  };
  
  const filterInvoicesData = (filters: {
    orderNumber?: string;
    invoiceNumber?: string;
    customerName?: string;
    providerName?: string;
    month?: string;
    status?: string;
  }) => {
    return filterInvoices(invoices, filters);
  };
  
  // Wrapper functions for invoice actions
  const downloadInvoiceData = (invoice: Invoice, type: InvoiceType) => {
    return downloadInvoiceAction(invoice, type);
  };
  
  const sendInvoiceEmailData = async (invoice: Invoice, email: string) => {
    return sendInvoiceEmailAction(invoice, email);
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
    getFinancialSummary: getFinancialSummaryData,
    getTopCustomers: getTopCustomersData,
    getRevenueByServiceType: getRevenueByServiceTypeData,
    getMonthlyRevenue: getMonthlyRevenueData,
    filterInvoices: filterInvoicesData,
    downloadInvoice: downloadInvoiceData,
    sendInvoiceEmail: sendInvoiceEmailData
  };
};
