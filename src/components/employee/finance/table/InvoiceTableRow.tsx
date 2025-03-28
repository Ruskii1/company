
import { 
  TableRow,
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';
import { Invoice, InvoiceType } from '@/types/finance';
import { InvoiceStatusBadge } from '../detail/InvoiceStatusBadge';
import { Download, Mail, MoreHorizontal, FileText, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface InvoiceTableRowProps {
  invoice: Invoice;
  onSendEmailClick: (invoice: Invoice) => void;
  onViewDetails: (invoice: Invoice) => void;
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
}

export function InvoiceTableRow({ 
  invoice, 
  onSendEmailClick,
  onViewDetails,
  downloadInvoice 
}: InvoiceTableRowProps) {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <TableRow key={invoice.id}>
      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
      <TableCell>{invoice.orderId}</TableCell>
      <TableCell>{invoice.customerName}</TableCell>
      <TableCell>{invoice.providerName}</TableCell>
      <TableCell>{invoice.serviceType}</TableCell>
      <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
      <TableCell>{format(invoice.issueDate, 'MMM d, yyyy')}</TableCell>
      <TableCell>{format(invoice.dueDate, 'MMM d, yyyy')}</TableCell>
      <TableCell>
        <InvoiceStatusBadge status={invoice.status} size="sm" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onViewDetails(invoice)}
            title={t.finance.invoiceDetails}
          >
            <Eye className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                  <div className="flex items-center px-2 py-1.5 text-sm">
                    <Download className="mr-2 h-4 w-4" />
                    <span>{t.downloadInvoice}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => downloadInvoice(invoice, 'Company')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{t.companyInvoice}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadInvoice(invoice, 'Provider')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{t.providerInvoice}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadInvoice(invoice, 'Client')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{t.clientInvoice}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenuItem onClick={() => onSendEmailClick(invoice)}>
                <Mail className="mr-2 h-4 w-4" />
                <span>{t.sendViaEmail}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
