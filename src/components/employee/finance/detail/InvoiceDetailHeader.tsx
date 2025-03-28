
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Mail } from 'lucide-react';
import { Invoice, InvoiceType } from '@/types/finance';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { useLanguageStore, translations } from '@/lib/i18n';

interface InvoiceDetailHeaderProps {
  invoice: Invoice;
  onBack: () => void;
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
  onSendEmailClick: (invoice: Invoice) => void;
}

export function InvoiceDetailHeader({ 
  invoice, 
  onBack, 
  downloadInvoice, 
  onSendEmailClick 
}: InvoiceDetailHeaderProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {financeT.backToInvoices}
        </Button>
        <h2 className="text-2xl font-bold">{financeT.invoiceDetails}</h2>
        <InvoiceStatusBadge status={invoice.status} />
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={() => downloadInvoice(invoice, 'Company')}
        >
          <Download className="mr-2 h-4 w-4" />
          {financeT.downloadInvoice}
        </Button>
        <Button 
          variant="default" 
          onClick={() => onSendEmailClick(invoice)}
        >
          <Mail className="mr-2 h-4 w-4" />
          {financeT.sendViaEmail}
        </Button>
      </div>
    </div>
  );
}
