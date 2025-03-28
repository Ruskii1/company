
import { 
  Invoice, 
  CancellationFee, 
  FinancialSummary,
  CustomerSpending,
  ServiceTypeRevenue,
  MonthlyRevenue
} from '@/types/finance';

// Calculate financial summary
export const getFinancialSummary = (
  invoices: Invoice[], 
  cancellationFees: CancellationFee[]
): FinancialSummary => {
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
export const getTopCustomers = (
  invoices: Invoice[], 
  limit: number = 5
): CustomerSpending[] => {
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
export const getRevenueByServiceType = (invoices: Invoice[]): ServiceTypeRevenue[] => {
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
export const getMonthlyRevenue = (
  invoices: Invoice[], 
  limit: number = 12
): MonthlyRevenue[] => {
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
export const filterInvoices = (
  invoices: Invoice[],
  filters: {
    orderNumber?: string;
    invoiceNumber?: string;
    customerName?: string;
    providerName?: string;
    month?: string;
    status?: string;
  }
) => {
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
