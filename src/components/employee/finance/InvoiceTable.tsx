
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
import { InvoiceDetailView } from './InvoiceDetailView';

interface InvoiceTableProps {
  invoices: Invoice[];
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
  sendInvoiceEmail: (invoice: Invoice, email: string) => Promise<boolean>;
  onEditInvoice?: (invoice: Invoice, field: string) => void;
}

export function InvoiceTable({ 
  invoices, 
  downloadInvoice,
  sendInvoiceEmail,
  onEditInvoice
}: InvoiceTableProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [detailViewOpen, setDetailViewOpen] = useState(false);

  const handleSendEmailClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setEmailDialogOpen(true);
  };

  const handleSendEmail = async (email: string) => {
    if (!selectedInvoice) return;
    
    await sendInvoiceEmail(selectedInvoice, email);
    setEmailDialogOpen(false);
  };
  
  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDetailViewOpen(true);
  };
  
  const handleBackToInvoices = () => {
    setDetailViewOpen(false);
    setSelectedInvoice(null);
  };

  // If detail view is open, show the invoice details
  if (detailViewOpen && selectedInvoice) {
    return (
      <InvoiceDetailView 
        invoice={selectedInvoice}
        downloadInvoice={downloadInvoice}
        onSendEmailClick={handleSendEmailClick}
        onBack={handleBackToInvoices}
        onEdit={onEditInvoice}
      />
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.finance.invoiceNumber}</TableHead>
              <TableHead>{t.finance.orderNumber}</TableHead>
              <TableHead>{t.finance.customer}</TableHead>
              <TableHead>{t.finance.provider}</TableHead>
              <TableHead>{t.finance.serviceType}</TableHead>
              <TableHead className="text-right">{t.finance.amount}</TableHead>
              <TableHead>{t.finance.issueDate}</TableHead>
              <TableHead>{t.finance.dueDate}</TableHead>
              <TableHead>{t.finance.status}</TableHead>
              <TableHead className="text-right">{t.finance.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  {t.finance.noInvoicesFound}
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <InvoiceTableRow 
                  key={invoice.id}
                  invoice={invoice}
                  onSendEmailClick={handleSendEmailClick}
                  onViewDetails={handleViewDetails}
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
