
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { format } from 'date-fns';

interface OrderInformationSectionProps {
  invoice: Invoice;
  onEdit?: (invoice: Invoice, field: string) => void;
  userRole?: string;
}

export function OrderInformationSection({ invoice, onEdit, userRole = 'AuthorizedEmployee' }: OrderInformationSectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  // Format date and time for display
  const formatDateTime = (date: Date): string => {
    return format(date, 'PPp');
  };

  return (
    <InvoiceSectionCard title={financeT.orderInformation || "Order Information"}>
      <InvoiceFieldRow 
        label={financeT.taskId} 
        value={invoice.orderId}
        invoice={invoice}
        fieldName="orderId"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.customerName} 
        value={invoice.customerName}
        invoice={invoice}
        fieldName="customerName"
        onEdit={onEdit}
        userRole={userRole}
      />
      {invoice.corporateName && (
        <InvoiceFieldRow 
          label={financeT.corporateName} 
          value={invoice.corporateName}
          invoice={invoice}
          fieldName="corporateName"
          onEdit={onEdit}
          userRole={userRole}
        />
      )}
      <InvoiceFieldRow 
        label={financeT.serviceType} 
        value={invoice.serviceType}
        invoice={invoice}
        fieldName="serviceType"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.pickupLocation} 
        value={invoice.pickupLocation}
        invoice={invoice}
        fieldName="pickupLocation"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.dropoffLocation} 
        value={invoice.dropoffLocation}
        invoice={invoice}
        fieldName="dropoffLocation"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.orderStartTime} 
        value={formatDateTime(invoice.orderStartTime)}
        invoice={invoice}
        fieldName="orderStartTime"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.orderCompletionTime} 
        value={formatDateTime(invoice.orderCompletionTime)}
        invoice={invoice}
        fieldName="orderCompletionTime"
        onEdit={onEdit}
        userRole={userRole}
      />
    </InvoiceSectionCard>
  );
}
