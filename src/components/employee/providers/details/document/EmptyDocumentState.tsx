
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileQuestion, Upload } from 'lucide-react';

interface EmptyDocumentStateProps {
  searchQuery?: string;
  onUploadClick: () => void;
}

export function EmptyDocumentState({ searchQuery, onUploadClick }: EmptyDocumentStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground/60 mb-4" />
      
      <h3 className="text-lg font-medium">
        {searchQuery 
          ? 'No documents matching your search'
          : 'No documents uploaded yet'
        }
      </h3>
      
      <p className="text-muted-foreground mt-2 mb-6">
        {searchQuery
          ? 'Try changing your search query or removing filters'
          : 'Upload the required documents to verify this provider'
        }
      </p>
      
      {!searchQuery && (
        <Button onClick={onUploadClick}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      )}
    </div>
  );
}
