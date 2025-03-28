
import { Invoice } from '@/types/finance';
import { InvoiceFieldRow } from '../InvoiceFieldRow';
import { InvoiceSectionCard } from '../InvoiceSectionCard';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';

interface ProviderInfoSectionProps {
  invoice: Invoice;
  onEdit?: (invoice: Invoice, field: string) => void;
  userRole?: string;
}

export function ProviderInfoSection({ invoice, onEdit, userRole = 'AuthorizedEmployee' }: ProviderInfoSectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  return (
    <InvoiceSectionCard title={financeT.serviceProviderInformation || "Service Provider Information"}>
      <InvoiceFieldRow 
        label={financeT.providerName} 
        value={invoice.providerName}
        invoice={invoice}
        fieldName="providerName"
        onEdit={onEdit}
        userRole={userRole}
      />
      <InvoiceFieldRow 
        label={financeT.providerPhone} 
        value={invoice.providerPhone}
        invoice={invoice}
        fieldName="providerPhone"
        onEdit={onEdit}
        userRole={userRole}
      />
      {invoice.providerCompany && (
        <InvoiceFieldRow 
          label={financeT.providerCompany} 
          value={invoice.providerCompany}
          invoice={invoice}
          fieldName="providerCompany"
          onEdit={onEdit}
          userRole={userRole}
        />
      )}
      <InvoiceFieldRow 
        label={financeT.amountDueToProvider} 
        value={formatCurrency(invoice.amountDueToProvider)}
        invoice={invoice}
        fieldName="amountDueToProvider"
        onEdit={onEdit}
        userRole={userRole}
      />
      {invoice.providerBonus !== undefined && (
        <InvoiceFieldRow 
          label={financeT.providerBonus} 
          value={formatCurrency(invoice.providerBonus)}
          invoice={invoice}
          fieldName="providerBonus"
          onEdit={onEdit}
          userRole={userRole}
        />
      )}
    </InvoiceSectionCard>
  );
}
