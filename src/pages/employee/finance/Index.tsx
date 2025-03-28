
import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useLanguageStore, translations } from '@/lib/i18n';
import { useFinance } from '@/hooks/useFinance';
import { InvoiceFilters } from '@/components/employee/finance/InvoiceFilters';
import { InvoiceTable } from '@/components/employee/finance/InvoiceTable';
import { FinanceStats } from '@/components/employee/finance/FinanceStats';
import { RevenueChart } from '@/components/employee/finance/RevenueChart';
import { TopCustomersTable } from '@/components/employee/finance/TopCustomersTable';
import { CancellationFeesTable } from '@/components/employee/finance/CancellationFeesTable';
import { Invoice } from '@/types/finance';
import { FileText, BarChart3, DollarSign } from 'lucide-react';

const FinancePage = () => {
  const { language } = useLanguageStore();
  const t = translations[language];
  const { 
    invoices, 
    cancellationFees,
    loading, 
    getFinancialSummary, 
    getTopCustomers,
    getRevenueByServiceType,
    getMonthlyRevenue,
    filterInvoices,
    downloadInvoice,
    sendInvoiceEmail
  } = useFinance();
  
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(invoices);
  const [activeTab, setActiveTab] = useState('invoices');
  
  const handleFilter = (filters: any) => {
    const filtered = filterInvoices(filters);
    setFilteredInvoices(filtered);
  };
  
  const financialSummary = getFinancialSummary();
  const topCustomers = getTopCustomers(5);
  const serviceRevenue = getRevenueByServiceType();
  const monthlyRevenue = getMonthlyRevenue();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t.finance.financeAndReports}</h1>
        <p className="text-muted-foreground">{t.finance.financeAndReportsDescription}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{t.finance.invoiceManagement}</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>{t.finance.financialAnalytics}</span>
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>{t.finance.cashFlowAnalysis}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="space-y-4">
          <InvoiceFilters onFilter={handleFilter} />
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <InvoiceTable 
              invoices={filteredInvoices} 
              downloadInvoice={downloadInvoice}
              sendInvoiceEmail={sendInvoiceEmail}
            />
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <FinanceStats summaryData={financialSummary} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopCustomersTable customers={topCustomers} />
            <CancellationFeesTable fees={cancellationFees} />
          </div>
        </TabsContent>
        
        <TabsContent value="cashflow" className="space-y-6">
          <FinanceStats summaryData={financialSummary} />
          <RevenueChart 
            monthlyData={monthlyRevenue}
            serviceTypeData={serviceRevenue}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancePage;
