
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Edit } from 'lucide-react';
import { Invoice } from '@/types/finance';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore, translations } from '@/lib/i18n';

interface InvoiceFieldRowProps {
  label: string;
  value: string | number | boolean | React.ReactNode;
  invoice?: Invoice;
  fieldName?: string;
  onEdit?: (invoice: Invoice, field: string) => void;
  isEditable?: boolean;
}

export function InvoiceFieldRow({ 
  label, 
  value, 
  invoice, 
  fieldName, 
  onEdit, 
  isEditable = false 
}: InvoiceFieldRowProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  // Handle boolean values with badges
  const displayValue = () => {
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? "default" : "outline"}>
          {value ? financeT.yes : financeT.no}
        </Badge>
      );
    }
    return value;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{label}</TableCell>
      <TableCell>{displayValue()}</TableCell>
      <TableCell className="text-right">
        {isEditable && onEdit && invoice && fieldName && (
          <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, fieldName)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
