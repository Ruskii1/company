
import { useState } from 'react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useLanguageStore, translations } from '@/lib/i18n';
import { Search, X } from 'lucide-react';

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

  // Generate last 12 months for filter
  const getMonthOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'long', year: 'numeric' });
      options.push({ value: month, label });
    }
    return options;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="orderNumber">{t.orderNumber}</Label>
              <Input
                id="orderNumber"
                value={filters.orderNumber}
                onChange={(e) => handleChange('orderNumber', e.target.value)}
                placeholder={t.searchByOrderNumber}
              />
            </div>
            
            <div>
              <Label htmlFor="invoiceNumber">{t.invoiceNumber}</Label>
              <Input
                id="invoiceNumber"
                value={filters.invoiceNumber}
                onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                placeholder={t.searchByInvoiceNumber}
              />
            </div>
            
            <div>
              <Label htmlFor="customerName">{t.customerName}</Label>
              <Input
                id="customerName"
                value={filters.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                placeholder={t.searchByCustomerName}
              />
            </div>
            
            <div>
              <Label htmlFor="providerName">{t.providerName}</Label>
              <Input
                id="providerName"
                value={filters.providerName}
                onChange={(e) => handleChange('providerName', e.target.value)}
                placeholder={t.searchByProviderName}
              />
            </div>
            
            <div>
              <Label htmlFor="month">{t.month}</Label>
              <Select 
                value={filters.month} 
                onValueChange={(value) => handleChange('month', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.selectMonth} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_months">{t.allMonths}</SelectItem>
                  {getMonthOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">{t.status}</Label>
              <Select 
                value={filters.status} 
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.selectStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_statuses">{t.allStatuses}</SelectItem>
                  <SelectItem value="Paid">{t.paid}</SelectItem>
                  <SelectItem value="Unpaid">{t.unpaid}</SelectItem>
                  <SelectItem value="Overdue">{t.overdue}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={clearFilters}
              className="gap-2"
            >
              <X size={16} />
              {t.clearFilters}
            </Button>
            
            <Button type="submit" className="gap-2">
              <Search size={16} />
              {t.applyFilters}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
