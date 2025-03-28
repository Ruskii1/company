
import { useState } from 'react';
import { Invoice, InvoiceType } from '@/types/finance';
import { SendInvoiceEmailDialog } from './dialogs/SendInvoiceEmailDialog';
import { InvoiceDetailView } from './InvoiceDetailView';
import { InvoiceTableContainer } from './table/InvoiceTableContainer';

interface InvoiceTableProps {
  invoices: Invoice[];
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
  sendInvoiceEmail: (invoice: Invoice, email: string) => Promise<boolean>;
  onEditInvoice?: (invoice: Invoice, field: string) => void;
  userRole?: string;
}

export function InvoiceTable({ 
  invoices, 
  downloadInvoice,
  sendInvoiceEmail,
  onEditInvoice,
  userRole = 'AuthorizedEmployee'
}: InvoiceTableProps) {
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
        userRole={userRole}
      />
    );
  }

  return (
    <>
      <InvoiceTableContainer
        invoices={invoices}
        onSendEmailClick={handleSendEmailClick}
        onViewDetails={handleViewDetails}
        downloadInvoice={downloadInvoice}
      />
      
      <SendInvoiceEmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        selectedInvoice={selectedInvoice}
        onSendEmail={handleSendEmail}
      />
    </>
  );
}
