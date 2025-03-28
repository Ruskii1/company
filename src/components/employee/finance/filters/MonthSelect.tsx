
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguageStore, translations } from '@/lib/i18n';

interface MonthSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function MonthSelect({ value, onChange }: MonthSelectProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const getMonthOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'long', year: 'numeric' });
      options.push({ value: month, label });
    }
    return options;
  };
  
  return (
    <div>
      <Label htmlFor="month">{t.month}</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="month">
          <SelectValue placeholder={t.selectMonth} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_months">{t.allMonths}</SelectItem>
          {getMonthOptions().map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
