
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ServiceProvider } from '@/types/provider';

interface ProviderActionsProps {
  provider: ServiceProvider;
  onSelectProvider: (id: string) => void;
}

export function ProviderActions({ provider, onSelectProvider }: ProviderActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onSelectProvider(provider.id)}
      >
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );
}
