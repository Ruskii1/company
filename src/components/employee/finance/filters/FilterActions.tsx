
import { Button } from '@/components/ui/button';
import { useLanguageStore, translations } from '@/lib/i18n';
import { Search, X } from 'lucide-react';

interface FilterActionsProps {
  onClear: () => void;
  onApply: (e: React.FormEvent) => void;
}

export function FilterActions({ onClear, onApply }: FilterActionsProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  return (
    <div className="flex justify-between mt-6">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClear}
        className="gap-2"
      >
        <X size={16} />
        {t.clearFilters}
      </Button>
      
      <Button 
        type="submit" 
        onClick={(e) => onApply(e)}
        className="gap-2"
      >
        <Search size={16} />
        {t.applyFilters}
      </Button>
    </div>
  );
}
