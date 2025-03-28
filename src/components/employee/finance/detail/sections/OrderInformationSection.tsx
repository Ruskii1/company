
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { format } from 'date-fns';

interface OrderInformationSectionProps {
  invoice: Invoice;
}

export function OrderInformationSection({ invoice }: OrderInformationSectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  // Format date and time for display
  const formatDateTime = (date: Date): string => {
    return format(date, 'PPp');
  };

  return (
    <InvoiceSectionCard title="Order Information">
      <InvoiceFieldRow 
        label={financeT.orderNumber} 
        value={invoice.orderId} 
      />
      <InvoiceFieldRow 
        label={financeT.customerName} 
        value={invoice.customerName}
      />
      {invoice.corporateName && (
        <InvoiceFieldRow 
          label={financeT.corporateName} 
          value={invoice.corporateName}
        />
      )}
      <InvoiceFieldRow 
        label={financeT.serviceType} 
        value={invoice.serviceType}
      />
      <InvoiceFieldRow 
        label={financeT.pickupLocation} 
        value={invoice.pickupLocation}
      />
      <InvoiceFieldRow 
        label={financeT.dropoffLocation} 
        value={invoice.dropoffLocation}
      />
      <InvoiceFieldRow 
        label={financeT.orderStartTime} 
        value={formatDateTime(invoice.orderStartTime)}
      />
      <InvoiceFieldRow 
        label={financeT.orderCompletionTime} 
        value={formatDateTime(invoice.orderCompletionTime)}
      />
    </InvoiceSectionCard>
  );
}
