
import { useState } from 'react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { useLanguageStore, translations } from '@/lib/i18n';
import { SearchField } from './filters/SearchField';
import { MonthSelect } from './filters/MonthSelect';
import { StatusSelect } from './filters/StatusSelect';
import { FilterActions } from './filters/FilterActions';

interface InvoiceFiltersProps {
  onFilter: (filters: {
    orderNumber?: string;
    invoiceNumber?: string;
    customerName?: string;
    providerName?: string;
    month?: string;
    status?: string;
  }) => void;
}

export function InvoiceFilters({ onFilter }: InvoiceFiltersProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const [filters, setFilters] = useState({
    orderNumber: '',
    invoiceNumber: '',
    customerName: '',
    providerName: '',
    month: '',
    status: ''
  });

  const handleChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({
      orderNumber: '',
      invoiceNumber: '',
      customerName: '',
      providerName: '',
      month: '',
      status: ''
    });
    onFilter({});
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SearchField
              id="orderNumber"
              label={t.orderNumber}
              value={filters.orderNumber}
              placeholder={t.searchByOrderNumber}
              onChange={(value) => handleChange('orderNumber', value)}
            />
            
            <SearchField
              id="invoiceNumber"
              label={t.invoiceNumber}
              value={filters.invoiceNumber}
              placeholder={t.searchByInvoiceNumber}
              onChange={(value) => handleChange('invoiceNumber', value)}
            />
            
            <SearchField
              id="customerName"
              label={t.customerName}
              value={filters.customerName}
              placeholder={t.searchByCustomerName}
              onChange={(value) => handleChange('customerName', value)}
            />
            
            <SearchField
              id="providerName"
              label={t.providerName}
              value={filters.providerName}
              placeholder={t.searchByProviderName}
              onChange={(value) => handleChange('providerName', value)}
            />
            
            <MonthSelect
              value={filters.month}
              onChange={(value) => handleChange('month', value)}
            />
            
            <StatusSelect
              value={filters.status}
              onChange={(value) => handleChange('status', value)}
            />
          </div>
          
          <FilterActions
            onClear={clearFilters}
            onApply={handleSubmit}
          />
        </form>
      </CardContent>
    </Card>
  );
}
