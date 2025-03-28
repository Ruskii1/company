
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';

interface ProviderInfoSectionProps {
  invoice: Invoice;
  onEdit?: (invoice: Invoice, field: string) => void;
}

export function ProviderInfoSection({ invoice, onEdit }: ProviderInfoSectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  return (
    <InvoiceSectionCard title="Service Provider Information">
      <InvoiceFieldRow 
        label={financeT.providerName} 
        value={invoice.providerName}
      />
      <InvoiceFieldRow 
        label={financeT.providerPhone} 
        value={invoice.providerPhone}
      />
      {invoice.providerCompany && (
        <InvoiceFieldRow 
          label={financeT.providerCompany} 
          value={invoice.providerCompany}
        />
      )}
      <InvoiceFieldRow 
        label={financeT.amountDueToProvider} 
        value={formatCurrency(invoice.amountDueToProvider)}
        invoice={invoice}
        fieldName="amountDueToProvider"
        onEdit={onEdit}
        isEditable={true}
      />
      {invoice.providerBonus !== undefined && (
        <InvoiceFieldRow 
          label={financeT.providerBonus} 
          value={formatCurrency(invoice.providerBonus)}
          invoice={invoice}
          fieldName="providerBonus"
          onEdit={onEdit}
          isEditable={true}
        />
      )}
    </InvoiceSectionCard>
  );
}
