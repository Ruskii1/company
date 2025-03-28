
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguageStore, translations } from '@/lib/i18n';

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  return (
    <div>
      <Label htmlFor="status">{t.status}</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="status">
          <SelectValue placeholder={t.selectStatus} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_statuses">{t.allStatuses}</SelectItem>
          <SelectItem value="Paid">{t.paid}</SelectItem>
          <SelectItem value="Unpaid">{t.unpaid}</SelectItem>
          <SelectItem value="Overdue">{t.overdue}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
