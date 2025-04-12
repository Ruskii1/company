
import React from 'react';
import { Button } from '@/components/ui/button';
import { DocumentType } from '@/hooks/providers/types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Filter, RefreshCw } from 'lucide-react';

interface DocumentFilterProps {
  selectedTypes: DocumentType[];
  onFilterChange: (types: DocumentType[]) => void;
  onRefresh: () => void;
}

export function DocumentFilter({ 
  selectedTypes, 
  onFilterChange,
  onRefresh
}: DocumentFilterProps) {
  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: 'national_id', label: 'National ID' },
    { value: 'drivers_license', label: 'Driver\'s License' },
    { value: 'vehicle_registration', label: 'Vehicle Registration' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'truck', label: 'Truck' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'operational_license', label: 'Operational License' },
  ];

  const handleTypeToggle = (value: string[]) => {
    onFilterChange(value as DocumentType[]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-end">
      <div className="flex-1 hidden md:block">
        <p className="text-xs font-medium mb-1.5 text-muted-foreground">Filter by type</p>
        <ToggleGroup 
          type="multiple" 
          variant="outline"
          value={selectedTypes}
          onValueChange={handleTypeToggle}
          className="flex flex-wrap gap-1"
        >
          {documentTypes.map((type) => (
            <ToggleGroupItem 
              key={type.value} 
              value={type.value}
              size="sm"
              className="text-xs px-2 py-1 h-7"
            >
              {type.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      
      <div className="flex md:hidden gap-2 w-full">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {}}
        >
          <Filter className="h-3.5 w-3.5 mr-1" />
          Filter
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="hidden md:block">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          className="h-8"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
