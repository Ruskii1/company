
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, PhoneCall, MoreVertical } from 'lucide-react';
import { ServiceProvider } from '@/types/provider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ProviderActionsProps {
  provider: ServiceProvider;
  onSelectProvider: (id: string) => void;
}

export function ProviderActions({ provider, onSelectProvider }: ProviderActionsProps) {
  const handlePhoneCall = () => {
    window.open(`tel:${provider.phoneNumber}`, '_self');
  };

  return (
    <div className="flex justify-end gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onSelectProvider(provider.id)}
        className="hidden md:flex gap-1"
      >
        <Eye className="h-4 w-4 mr-1" />
        View
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => onSelectProvider(provider.id)}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={handlePhoneCall}>
            <PhoneCall className="h-4 w-4 mr-2" />
            Call
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSelectProvider(provider.id)}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
