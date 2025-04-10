
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCw } from 'lucide-react';
import { DocumentType } from '@/hooks/providers/types';
import { Badge } from '@/components/ui/badge';

interface DocumentFilterProps {
  onFilterChange: (types: DocumentType[]) => void;
  selectedTypes: DocumentType[];
  onRefresh?: () => void;
}

// Map of document types to display names
const documentTypeLabels: Record<DocumentType, string> = {
  'national_id': 'National ID',
  'drivers_license': 'Driver\'s License',
  'vehicle_registration': 'Vehicle Registration',
  'equipment': 'Equipment',
  'truck': 'Truck',
  'insurance': 'Insurance',
  'operational_license': 'Operational License',
  'other': 'Other'
};

export function DocumentFilter({ onFilterChange, selectedTypes, onRefresh }: DocumentFilterProps) {
  const documentTypes: DocumentType[] = [
    'national_id',
    'drivers_license',
    'vehicle_registration',
    'equipment',
    'truck',
    'insurance',
    'operational_license',
    'other'
  ];

  const handleToggleType = (type: DocumentType) => {
    if (selectedTypes.includes(type)) {
      onFilterChange(selectedTypes.filter(t => t !== type));
    } else {
      onFilterChange([...selectedTypes, type]);
    }
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="flex items-center gap-2">
      {selectedTypes.length > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear filters ({selectedTypes.length})
        </Button>
      )}
      
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh} className="gap-1">
          <RefreshCw size={14} />
          Refresh
        </Button>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filter
            {selectedTypes.length > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {selectedTypes.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by document type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {documentTypes.map(type => (
            <DropdownMenuCheckboxItem
              key={type}
              checked={selectedTypes.includes(type)}
              onCheckedChange={() => handleToggleType(type)}
            >
              {documentTypeLabels[type]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
