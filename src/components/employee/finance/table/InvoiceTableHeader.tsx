
import { 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useLanguageStore, translations } from '@/lib/i18n';

export function InvoiceTableHeader() {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t.finance.invoiceNumber}</TableHead>
        <TableHead>{t.finance.orderNumber}</TableHead>
        <TableHead>{t.finance.customer}</TableHead>
        <TableHead>{t.finance.provider}</TableHead>
        <TableHead>{t.finance.serviceType}</TableHead>
        <TableHead className="text-right">{t.finance.amount}</TableHead>
        <TableHead>{t.finance.issueDate}</TableHead>
        <TableHead>{t.finance.dueDate}</TableHead>
        <TableHead>{t.finance.status}</TableHead>
        <TableHead className="text-right">{t.finance.actions}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
