
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';

interface OrderChargesSectionProps {
  invoice: Invoice;
  onEdit?: (invoice: Invoice, field: string) => void;
}

export function OrderChargesSection({ invoice, onEdit }: OrderChargesSectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  return (
    <InvoiceSectionCard title="Order Charges Breakdown">
      <InvoiceFieldRow 
        label={financeT.baseServiceFee} 
        value={formatCurrency(invoice.baseServiceFee)}
        invoice={invoice}
        fieldName="baseServiceFee"
        onEdit={onEdit}
        isEditable={true}
      />
      <InvoiceFieldRow 
        label={financeT.distanceCost} 
        value={formatCurrency(invoice.distanceCost)}
        invoice={invoice}
        fieldName="distanceCost"
        onEdit={onEdit}
        isEditable={true}
      />
      <InvoiceFieldRow 
        label={financeT.vat} 
        value={formatCurrency(invoice.taxAmount)}
      />
      <InvoiceFieldRow 
        label={financeT.totalAmount} 
        value={formatCurrency(invoice.amount)}
        invoice={invoice}
        fieldName="amount"
        onEdit={onEdit}
        isEditable={true}
      />
    </InvoiceSectionCard>
  );
}
