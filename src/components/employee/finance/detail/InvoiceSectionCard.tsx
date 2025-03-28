
import { ReactNode } from 'react';
import { 
  Card, 
  CardContent, 
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
import { useLanguageStore, translations } from '@/lib/i18n';

interface InvoiceSectionCardProps {
  title: string;
  children: ReactNode;
}

export function InvoiceSectionCard({ title, children }: InvoiceSectionCardProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
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
            {children}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
