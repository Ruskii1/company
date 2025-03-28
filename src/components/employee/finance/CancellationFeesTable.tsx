
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';
import { CancellationFee } from '@/types/finance';
import { XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface CancellationFeesTableProps {
  fees: CancellationFee[];
}

export function CancellationFeesTable({ fees }: CancellationFeesTableProps) {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{t.cancellationFees}</CardTitle>
          <CardDescription>{t.cancellationFeesTableDescription}</CardDescription>
        </div>
        <div className="bg-primary/10 text-primary p-2 rounded-full">
          <XCircle className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.orderNumber}</TableHead>
              <TableHead>{t.customer}</TableHead>
              <TableHead>{t.reason}</TableHead>
              <TableHead>{t.date}</TableHead>
              <TableHead className="text-right">{t.amount}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  {t.noCancellationFees}
                </TableCell>
              </TableRow>
            ) : (
              fees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.orderId}</TableCell>
                  <TableCell>{fee.customerName}</TableCell>
                  <TableCell>{fee.reason || '-'}</TableCell>
                  <TableCell>{format(fee.chargedAt, 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">{formatCurrency(fee.amount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
