
import { useState } from 'react';
import { ProviderStatus } from '@/types/provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { serviceTypeValues as defaultServiceTypeValues } from '@/components/forms/ServiceTypeField';
import { useLanguageStore, translations } from '@/lib/i18n';

interface ProviderFilterProps {
  onFilter: (filters: {
    name?: string;
    region?: string;
    phone?: string;
    serviceType?: string;
    status?: ProviderStatus;
  }) => void;
  onReset: () => void;
  regions: string[];
  serviceTypes?: string[];
}

export function ProviderFilter({ onFilter, onReset, regions, serviceTypes }: ProviderFilterProps) {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const types = serviceTypes || defaultServiceTypeValues;

  const handleFilter = () => {
    const filters: {
      name?: string;
      region?: string;
      phone?: string;
      serviceType?: string;
      status?: ProviderStatus;
    } = {};
    
    if (name) filters.name = name;
    if (region) filters.region = region;
    if (phone) filters.phone = phone;
    if (serviceType) filters.serviceType = serviceType;
    
    onFilter(filters);
  };

  const handleReset = () => {
    setName('');
    setRegion('');
    setPhone('');
    setServiceType('');
    onReset();
  };

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      <h3 className="font-medium">Filter Providers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Provider Name</label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Region</label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_regions">All Regions</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r || "unknown_region"}>{r || "Unknown"}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Phone Number</label>
          <Input
            placeholder="Search by phone..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Service Type</label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_services">All Service Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {t.services[type] || type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={handleReset}>
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
        <Button onClick={handleFilter}>
          <Search className="h-4 w-4 mr-1" />
          Filter
        </Button>
      </div>
    </div>
  );
}
