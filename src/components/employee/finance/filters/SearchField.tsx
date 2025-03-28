
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function SearchField({ id, label, value, placeholder, onChange }: SearchFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
