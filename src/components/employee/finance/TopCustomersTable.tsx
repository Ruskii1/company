
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
import { CustomerSpending } from '@/types/finance';
import { Users } from 'lucide-react';

interface TopCustomersTableProps {
  customers: CustomerSpending[];
}

export function TopCustomersTable({ customers }: TopCustomersTableProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = translations[language].finance;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{financeT.topSpendingCustomers}</CardTitle>
          <CardDescription>{financeT.topSpendingCustomersDescription}</CardDescription>
        </div>
        <div className="bg-primary/10 text-primary p-2 rounded-full">
          <Users className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{financeT.customer}</TableHead>
              <TableHead>{financeT.invoices}</TableHead>
              <TableHead className="text-right">{financeT.totalSpent}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customerName}>
                <TableCell className="font-medium">{customer.customerName}</TableCell>
                <TableCell>{customer.invoiceCount}</TableCell>
                <TableCell className="text-right">{formatCurrency(customer.totalSpent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
