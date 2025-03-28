
import { Invoice, InvoiceType } from '@/types/finance';
import { InvoiceDetailHeader } from './detail/InvoiceDetailHeader';
import { InvoiceDetailsSection } from './detail/sections/InvoiceDetailsSection';
import { OrderInformationSection } from './detail/sections/OrderInformationSection';
import { OrderChargesSection } from './detail/sections/OrderChargesSection';
import { ProviderInfoSection } from './detail/sections/ProviderInfoSection';
import { InvoiceActivitySection } from './detail/sections/InvoiceActivitySection';

interface InvoiceDetailViewProps {
  invoice: Invoice;
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
  onSendEmailClick: (invoice: Invoice) => void;
  onBack: () => void;
  onEdit?: (invoice: Invoice, field: string) => void;
}

export function InvoiceDetailView({ 
  invoice, 
  downloadInvoice, 
  onSendEmailClick,
  onBack,
  onEdit 
}: InvoiceDetailViewProps) {
  return (
    <div className="space-y-6">
      <InvoiceDetailHeader 
        invoice={invoice} 
        onBack={onBack} 
        downloadInvoice={downloadInvoice} 
        onSendEmailClick={onSendEmailClick} 
      />
      
      <InvoiceDetailsSection invoice={invoice} onEdit={onEdit} />
      <OrderInformationSection invoice={invoice} />
      <OrderChargesSection invoice={invoice} onEdit={onEdit} />
      <ProviderInfoSection invoice={invoice} onEdit={onEdit} />
      <InvoiceActivitySection invoice={invoice} onEdit={onEdit} />
    </div>
  );
}
