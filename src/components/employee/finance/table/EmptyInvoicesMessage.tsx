
import { TableCell, TableRow } from '@/components/ui/table';
import { useLanguageStore, translations } from '@/lib/i18n';

export function EmptyInvoicesMessage() {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  return (
    <TableRow>
      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
        {t.finance.noInvoicesFound}
      </TableCell>
    </TableRow>
  );
}
