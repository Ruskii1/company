
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ServiceProvider } from '@/types/provider';
import { serviceTypeValues } from '@/components/forms/ServiceTypeField';
import { useLanguageStore, translations } from '@/lib/i18n';

interface MapControlsProps {
  filter: {
    status: string;
    search: string;
    serviceType: string;
  };
  setFilter: React.Dispatch<React.SetStateAction<{
    status: string;
    search: string;
    serviceType: string;
  }>>;
}

const MapControls: React.FC<MapControlsProps> = ({ filter, setFilter }) => {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  return (
    <div className="absolute top-4 left-4 z-10 bg-white/90 p-4 rounded-lg shadow-md w-72 space-y-3 backdrop-blur-sm">
      <div className="text-lg font-semibold mb-2">Provider Map</div>
      
      {/* Search */}
      <div className="relative">
        <Input 
          placeholder="Search by name or phone"
          className="pr-8"
          value={filter.search}
          onChange={(e) => setFilter({...filter, search: e.target.value})}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-0 h-full"
          onClick={() => {}}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Status filter */}
      <div>
        <Select 
          value={filter.status}
          onValueChange={(value) => setFilter({...filter, status: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Provider Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            <SelectItem value="online">Online Only</SelectItem>
            <SelectItem value="offline">Offline Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Service Type filter */}
      <div>
        <Select 
          value={filter.serviceType}
          onValueChange={(value) => setFilter({...filter, serviceType: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            {serviceTypeValues.map((type) => (
              <SelectItem key={type} value={type}>
                {t.services[type] || type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MapControls;
