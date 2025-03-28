
import { Table } from '@/components/ui/table';
import { InvoiceTableHeader } from './InvoiceTableHeader';
import { InvoiceTableBody } from './InvoiceTableBody';
import { Invoice, InvoiceType } from '@/types/finance';

interface InvoiceTableContainerProps {
  invoices: Invoice[];
  onSendEmailClick: (invoice: Invoice) => void;
  onViewDetails: (invoice: Invoice) => void;
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
}

export function InvoiceTableContainer({
  invoices,
  onSendEmailClick,
  onViewDetails,
  downloadInvoice
}: InvoiceTableContainerProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <InvoiceTableHeader />
        <InvoiceTableBody
          invoices={invoices}
          onSendEmailClick={onSendEmailClick}
          onViewDetails={onViewDetails}
          downloadInvoice={downloadInvoice}
        />
      </Table>
    </div>
  );
}
