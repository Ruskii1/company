
import React from 'react';
import { ServiceProvider, Document as ProviderDocument } from '@/types/provider';
import { DocumentCard } from './DocumentCard';
import { EmptyDocumentState } from './EmptyDocumentState';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface DocumentListProps {
  provider: ServiceProvider;
  documents: ProviderDocument[];
  onUploadClick: () => void;
}

export function DocumentList({ provider, documents, onUploadClick }: DocumentListProps) {
  const documentCount = provider.documents.length;
  const filteredCount = documents.length;
  
  if (documentCount === 0) {
    return <EmptyDocumentState onUploadClick={onUploadClick} />;
  }

  if (filteredCount === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="px-2 py-1">
            <FileText className="h-3 w-3 mr-1" />
            Total: {documentCount}
          </Badge>
          <Badge variant="secondary" className="px-2 py-1">No documents match your filters</Badge>
        </div>
        <EmptyDocumentState searchQuery="No matching documents found" onUploadClick={onUploadClick} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documentCount !== filteredCount && (
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="px-2 py-1">
            <FileText className="h-3 w-3 mr-1" />
            Showing {filteredCount} of {documentCount} documents
          </Badge>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
}
