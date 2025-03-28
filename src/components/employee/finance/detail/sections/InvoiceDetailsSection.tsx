
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { format } from 'date-fns';
import { getFieldPermission } from '@/types/permissions';

interface InvoiceDetailsSectionProps {
  invoice: Invoice;
  onEdit?: (invoice: Invoice, field: string) => void;
  userRole?: string;
}

export function InvoiceDetailsSection({ invoice, onEdit, userRole = 'AuthorizedEmployee' }: InvoiceDetailsSectionProps) {
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
        label={financeT.taskId} 
        value={invoice.orderId}
        invoice={invoice}
        fieldName="orderId"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.issueDate} 
        value={formatDateTime(invoice.issueDate)}
        invoice={invoice}
        fieldName="issueDate"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.billable} 
        value={invoice.isBillable}
        invoice={invoice}
        fieldName="isBillable"
        onEdit={onEdit}
        userRole={userRole}
      />
    </InvoiceSectionCard>
  );
}
