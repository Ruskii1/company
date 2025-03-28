
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Download, Mail, ArrowLeft } from 'lucide-react';
import { useLanguageStore, translations } from '@/lib/i18n';
import { Invoice, InvoiceSection, InvoiceType } from '@/types/finance';
import { formatCurrency } from '@/utils/formatters';

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
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;
  
  // Format date for display
  const formatDate = (date: Date): string => {
    return format(date, 'PPP');
  };
  
  // Format time for display
  const formatTime = (date: Date): string => {
    return format(date, 'p');
  };
  
  // Format date and time for display
  const formatDateTime = (date: Date): string => {
    return format(date, 'PPp');
  };
  
  // Get status badge color
  const getStatusColor = (status: string): string => {
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
  
  // Group fields by section for Saudi e-invoicing format
  const renderSection = (section: InvoiceSection) => {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>{section}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">{financeT.field}</TableHead>
                <TableHead className="w-1/2">{financeT.value}</TableHead>
                <TableHead className="w-1/6 text-right">{financeT.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {section === 'Invoice Details' && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.invoiceNumber}</TableCell>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.issueDate}</TableCell>
                    <TableCell>{formatDateTime(invoice.issueDate)}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.billable}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.isBillable ? "default" : "outline"}>
                        {invoice.isBillable ? financeT.yes : financeT.no}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {onEdit && (
                        <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, 'isBillable')}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              )}
              
              {section === 'Order Information' && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.orderNumber}</TableCell>
                    <TableCell>{invoice.orderId}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.customerName}</TableCell>
                    <TableCell>{invoice.customerName}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  {invoice.corporateName && (
                    <TableRow>
                      <TableCell className="font-medium">{financeT.corporateName}</TableCell>
                      <TableCell>{invoice.corporateName}</TableCell>
                      <TableCell className="text-right">
                        {/* No edit for system fields */}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="font-medium">{financeT.serviceType}</TableCell>
                    <TableCell>{invoice.serviceType}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.pickupLocation}</TableCell>
                    <TableCell>{invoice.pickupLocation}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.dropoffLocation}</TableCell>
                    <TableCell>{invoice.dropoffLocation}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.orderStartTime}</TableCell>
                    <TableCell>{formatDateTime(invoice.orderStartTime)}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.orderCompletionTime}</TableCell>
                    <TableCell>{formatDateTime(invoice.orderCompletionTime)}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                </>
              )}
              
              {section === 'Order Charges Breakdown' && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.baseServiceFee}</TableCell>
                    <TableCell>{formatCurrency(invoice.baseServiceFee)}</TableCell>
                    <TableCell className="text-right">
                      {onEdit && (
                        <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, 'baseServiceFee')}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.distanceCost}</TableCell>
                    <TableCell>{formatCurrency(invoice.distanceCost)}</TableCell>
                    <TableCell className="text-right">
                      {onEdit && (
                        <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, 'distanceCost')}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.vat}</TableCell>
                    <TableCell>{formatCurrency(invoice.taxAmount)}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system VAT */}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell className="font-medium">{financeT.totalAmount}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell className="text-right">
                      {onEdit && (
                        <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, 'amount')}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              )}
              
              {section === 'Service Provider Information' && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.providerName}</TableCell>
                    <TableCell>{invoice.providerName}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.providerPhone}</TableCell>
                    <TableCell>{invoice.providerPhone}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  {invoice.providerCompany && (
                    <TableRow>
                      <TableCell className="font-medium">{financeT.providerCompany}</TableCell>
                      <TableCell>{invoice.providerCompany}</TableCell>
                      <TableCell className="text-right">
                        {/* No edit for system fields */}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="font-medium">{financeT.amountDueToProvider}</TableCell>
                    <TableCell>{formatCurrency(invoice.amountDueToProvider)}</TableCell>
                    <TableCell className="text-right">
                      {onEdit && (
                        <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, 'amountDueToProvider')}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  {invoice.providerBonus !== undefined && (
                    <TableRow>
                      <TableCell className="font-medium">{financeT.providerBonus}</TableCell>
                      <TableCell>{formatCurrency(invoice.providerBonus)}</TableCell>
                      <TableCell className="text-right">
                        {onEdit && (
                          <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, 'providerBonus')}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
              
              {section === 'Invoice Activity Log' && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.invoiceCreatedAt}</TableCell>
                    <TableCell>{formatDateTime(invoice.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{financeT.invoiceLastModifiedAt}</TableCell>
                    <TableCell>{formatDateTime(invoice.lastModifiedAt)}</TableCell>
                    <TableCell className="text-right">
                      {/* No edit for system fields */}
                    </TableCell>
                  </TableRow>
                  {invoice.markedBillableBy && (
                    <TableRow>
                      <TableCell className="font-medium">{financeT.markedBillableBy}</TableCell>
                      <TableCell>{invoice.markedBillableBy}</TableCell>
                      <TableCell className="text-right">
                        {/* No edit for system fields */}
                      </TableCell>
                    </TableRow>
                  )}
                  {invoice.internalNotes && (
                    <TableRow>
                      <TableCell className="font-medium">{financeT.internalNotes}</TableCell>
                      <TableCell>{invoice.internalNotes}</TableCell>
                      <TableCell className="text-right">
                        {onEdit && (
                          <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, 'internalNotes')}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {financeT.backToInvoices}
          </Button>
          <h2 className="text-2xl font-bold">{financeT.invoiceDetails}</h2>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status}
          </Badge>
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
      
      {renderSection('Invoice Details')}
      {renderSection('Order Information')}
      {renderSection('Order Charges Breakdown')}
      {renderSection('Service Provider Information')}
      {renderSection('Invoice Activity Log')}
    </div>
  );
}
