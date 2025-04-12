
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { ProviderStatus } from '@/types/provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface StatusSelectorProps {
  currentStatus: ProviderStatus;
  onStatusChange: (status: ProviderStatus) => void;
}

const statusOptions: { value: ProviderStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'paused', label: 'Paused' },
  { value: 'blacklisted', label: 'Blacklisted' },
  { value: 'deleted', label: 'Deleted' },
];

export function StatusSelector({ currentStatus, onStatusChange }: StatusSelectorProps) {
  const { toast } = useToast();

  const handleStatusChange = (status: ProviderStatus) => {
    if (status === currentStatus) return;
    
    onStatusChange(status);
    
    toast({
      title: "Status Updated",
      description: `Provider status has been changed to ${getStatusLabel(status)}.`,
    });
  };

  const getStatusLabel = (status: ProviderStatus): string => {
    return statusOptions.find(option => option.value === status)?.label || status;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1">
          <span>Change Status</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            {option.label}
            {currentStatus === option.value && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
