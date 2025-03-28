
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';
import { Invoice, InvoiceType } from '@/types/finance';
import { Download, Mail, MoreHorizontal, FileText, Send } from 'lucide-react';
import { format } from 'date-fns';

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
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    if (!selectedInvoice || !email) return;

    setIsSending(true);
    try {
      await sendInvoiceEmail(selectedInvoice, email);
      setEmailDialogOpen(false);
      setEmail('');
    } finally {
      setIsSending(false);
    }
  };

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
                  {t.noInvoicesFound}
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
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
                        
                        <DropdownMenuItem onClick={() => {
                          setSelectedInvoice(invoice);
                          setEmailDialogOpen(true);
                        }}>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>{t.sendViaEmail}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.sendInvoiceViaEmail}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.recipientEmail}</Label>
              <Input
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {t.invoiceToSend}: {selectedInvoice?.invoiceNumber}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t.cancel}</Button>
            </DialogClose>
            <Button 
              onClick={handleSendEmail} 
              disabled={!email || isSending}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {isSending ? t.sending : t.sendEmail}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
