
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Power } from 'lucide-react';
import { ServiceProvider, ProviderStatus } from '@/types/provider';

interface ProviderActionsProps {
  provider: ServiceProvider;
  onSelectProvider: (id: string) => void;
  onToggleStatus: (id: string, status: ProviderStatus) => void;
}

export function ProviderActions({ provider, onSelectProvider, onToggleStatus }: ProviderActionsProps) {
  const toggleStatus = () => {
    const newStatus = provider.status === 'active' ? 'paused' : 'active';
    onToggleStatus(provider.id, newStatus);
  };

  return (
    <div className="flex justify-end gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onSelectProvider(provider.id)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant={provider.status === 'active' ? 'default' : 'secondary'} 
        size="icon"
        onClick={toggleStatus}
      >
        <Power className="h-4 w-4" />
      </Button>
    </div>
  );
}
