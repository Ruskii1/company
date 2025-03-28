import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useLanguageStore, translations } from '@/lib/i18n';
import { Invoice, InvoiceType } from '@/types/finance';
import { InvoiceTableRow } from './table/InvoiceTableRow';
import { SendInvoiceEmailDialog } from './dialogs/SendInvoiceEmailDialog';

interface InvoiceTableProps {
  invoices: Invoice[];
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
  sendInvoiceEmail: (invoice: Invoice, email: string) => Promise<boolean>;
}

export function InvoiceTable({ 
  invoices, 
  downloadInvoice,
  sendInvoiceEmail
}: InvoiceTableProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const handleSendEmailClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setEmailDialogOpen(true);
  };

  const handleSendEmail = async (email: string) => {
    if (!selectedInvoice) return;
    
    await sendInvoiceEmail(selectedInvoice, email);
    setEmailDialogOpen(false);
  };

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.invoiceNumber}</TableHead>
              <TableHead>{t.orderNumber}</TableHead>
              <TableHead>{t.customer}</TableHead>
              <TableHead>{t.provider}</TableHead>
              <TableHead>{t.serviceType}</TableHead>
              <TableHead className="text-right">{t.amount}</TableHead>
              <TableHead>{t.issueDate}</TableHead>
              <TableHead>{t.dueDate}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  {t.common.noData}
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <InvoiceTableRow 
                  key={invoice.id}
                  invoice={invoice}
                  onSendEmailClick={handleSendEmailClick}
                  downloadInvoice={downloadInvoice}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <SendInvoiceEmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        selectedInvoice={selectedInvoice}
        onSendEmail={handleSendEmail}
      />
    </>
  );
}
