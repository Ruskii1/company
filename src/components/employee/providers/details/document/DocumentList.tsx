
import React from 'react';
import { ServiceProvider, Document as ProviderDocument } from '@/types/provider';
import { DocumentCard } from './DocumentCard';
import { EmptyDocumentState } from './EmptyDocumentState';

interface DocumentListProps {
  provider: ServiceProvider;
  documents: ProviderDocument[];
  onUploadClick: () => void;
}

export function DocumentList({ provider, documents, onUploadClick }: DocumentListProps) {
  if (provider.documents.length === 0) {
    return <EmptyDocumentState onUploadClick={onUploadClick} />;
  }

  if (documents.length === 0) {
    return <EmptyDocumentState searchQuery="No matching documents found" onUploadClick={onUploadClick} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
}
