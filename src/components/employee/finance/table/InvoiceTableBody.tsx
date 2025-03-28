
import { TableBody } from '@/components/ui/table';
import { Invoice } from '@/types/finance';
import { InvoiceTableRow } from './InvoiceTableRow';
import { EmptyInvoicesMessage } from './EmptyInvoicesMessage';

interface InvoiceTableBodyProps {
  invoices: Invoice[];
  onSendEmailClick: (invoice: Invoice) => void;
  onViewDetails: (invoice: Invoice) => void;
  downloadInvoice: (invoice: Invoice, type: 'Company' | 'Provider' | 'Client') => void;
}

export function InvoiceTableBody({ 
  invoices, 
  onSendEmailClick, 
  onViewDetails, 
  downloadInvoice 
}: InvoiceTableBodyProps) {
  if (invoices.length === 0) {
    return (
      <TableBody>
        <EmptyInvoicesMessage />
      </TableBody>
    );
  }
  
  return (
    <TableBody>
      {invoices.map((invoice) => (
        <InvoiceTableRow 
          key={invoice.id}
          invoice={invoice}
          onSendEmailClick={onSendEmailClick}
          onViewDetails={onViewDetails}
          downloadInvoice={downloadInvoice}
        />
      ))}
    </TableBody>
  );
}
