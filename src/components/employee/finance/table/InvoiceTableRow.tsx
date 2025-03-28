
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
import { Download, Mail, MoreHorizontal, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface InvoiceTableRowProps {
  invoice: Invoice;
  onSendEmailClick: (invoice: Invoice) => void;
  downloadInvoice: (invoice: Invoice, type: InvoiceType) => void;
}

export function InvoiceTableRow({ 
  invoice, 
  onSendEmailClick,
  downloadInvoice 
}: InvoiceTableRowProps) {
  const { language } = useLanguageStore();
  const t = translations[language];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Unpaid':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

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
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(invoice.status)}`}>
          {invoice.status}
        </span>
      </TableCell>
      <TableCell className="text-right">
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
      </TableCell>
    </TableRow>
  );
}
