
import { useState } from 'react';
import { ProviderStatus } from '@/types/provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { serviceTypeValues as defaultServiceTypeValues } from '@/components/forms/ServiceTypeField';
import { useLanguageStore, translations } from '@/lib/i18n';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

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
  const [status, setStatus] = useState<string>('');
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
    if (status) filters.status = status as ProviderStatus;
    
    onFilter(filters);
  };

  const handleReset = () => {
    setName('');
    setRegion('');
    setPhone('');
    setServiceType('');
    setStatus('');
    onReset();
  };

  return (
    <Card className="p-5 bg-white dark:bg-gray-800 shadow-sm">
      <Accordion type="single" collapsible defaultValue="filters">
        <AccordionItem value="filters" className="border-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <AccordionTrigger className="hover:no-underline p-0 font-medium">
                Filter Providers
              </AccordionTrigger>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset} className="h-8">
                <X className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              <Button size="sm" onClick={handleFilter} className="h-8">
                <Search className="h-3.5 w-3.5 mr-1" />
                Apply
              </Button>
            </div>
          </div>
          
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-xs font-medium mb-1.5 block text-muted-foreground">
                  Provider Name
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-8 h-9"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1.5 block text-muted-foreground">
                  Region
                </label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Regions</SelectItem>
                    {regions.map((r) => (
                      <SelectItem key={r} value={r || "unknown_region"}>{r || "Unknown"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1.5 block text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  placeholder="Search by phone..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-9"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1.5 block text-muted-foreground">
                  Service Type
                </label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Service Types</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t.services[type] || type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1.5 block text-muted-foreground">
                  Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="blacklisted">Blacklisted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
