
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { format } from 'date-fns';

interface InvoiceDetailsSectionProps {
  invoice: Invoice;
  onEdit?: (invoice: Invoice, field: string) => void;
}

export function InvoiceDetailsSection({ invoice, onEdit }: InvoiceDetailsSectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  // Format date and time for display
  const formatDateTime = (date: Date): string => {
    return format(date, 'PPp');
  };

  return (
    <InvoiceSectionCard title={financeT.invoiceDetails}>
      <InvoiceFieldRow 
        label={financeT.invoiceNumber} 
        value={invoice.invoiceNumber} 
      />
      <InvoiceFieldRow 
        label={financeT.issueDate} 
        value={formatDateTime(invoice.issueDate)}
      />
      <InvoiceFieldRow 
        label={financeT.billable} 
        value={invoice.isBillable} 
        invoice={invoice} 
        fieldName="isBillable" 
        onEdit={onEdit}
        isEditable={true}
      />
    </InvoiceSectionCard>
  );
}
