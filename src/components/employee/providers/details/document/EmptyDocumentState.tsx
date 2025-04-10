
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface EmptyDocumentStateProps {
  searchQuery?: string;
  onUploadClick: () => void;
}

export function EmptyDocumentState({ searchQuery = '', onUploadClick }: EmptyDocumentStateProps) {
  return (
    <div className="text-center text-muted-foreground py-8">
      {searchQuery ? 'No documents match your search' : 'No documents found'}
      <div className="mt-4">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={onUploadClick}
        >
          <Upload size={16} />
          Upload Document
        </Button>
      </div>
    </div>
  );
}
