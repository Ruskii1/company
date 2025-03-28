
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { format } from 'date-fns';

interface InvoiceActivitySectionProps {
  invoice: Invoice;
  onEdit?: (invoice: Invoice, field: string) => void;
  userRole?: string;
}

export function InvoiceActivitySection({ invoice, onEdit, userRole = 'AuthorizedEmployee' }: InvoiceActivitySectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  // Format date and time for display
  const formatDateTime = (date: Date): string => {
    return format(date, 'PPp');
  };

  return (
    <InvoiceSectionCard title={financeT.invoiceActivityLog || "Invoice Activity Log"}>
      <InvoiceFieldRow 
        label={financeT.invoiceCreatedAt} 
        value={formatDateTime(invoice.createdAt)}
        invoice={invoice}
        fieldName="createdAt"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.invoiceLastModifiedAt} 
        value={formatDateTime(invoice.lastModifiedAt)}
        invoice={invoice}
        fieldName="lastModifiedAt"
        onEdit={onEdit}
        userRole={userRole}
      />
      {invoice.markedBillableBy && (
        <InvoiceFieldRow 
          label={financeT.markedBillableBy} 
          value={invoice.markedBillableBy}
          invoice={invoice}
          fieldName="markedBillableBy"
          onEdit={onEdit}
          userRole={userRole}
        />
      )}
      {invoice.internalNotes && (
        <InvoiceFieldRow 
          label={financeT.internalNotes} 
          value={invoice.internalNotes}
          invoice={invoice}
          fieldName="internalNotes"
          onEdit={onEdit}
          userRole={userRole}
        />
      )}
    </InvoiceSectionCard>
  );
}
