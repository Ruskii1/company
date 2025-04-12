
import { useState } from 'react';
import { CorporateDocument } from '@/types/corporate';

export const useDocuments = (
  accountDocuments: CorporateDocument[] = [],
  updateDocuments: (documents: CorporateDocument[]) => void
) => {
  const addDocument = (document: CorporateDocument) => {
    const updatedDocuments = [...accountDocuments, document];
    updateDocuments(updatedDocuments);
  };

  const deleteDocument = (documentId: string) => {
    const updatedDocuments = accountDocuments.filter(doc => doc.id !== documentId);
    updateDocuments(updatedDocuments);
  };

  return {
    addDocument,
    deleteDocument
  };
};
