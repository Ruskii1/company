
import React, { useState } from 'react';
import { ServiceProvider, Document as ProviderDocument } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DocumentList } from './document/DocumentList';
import { DocumentUploadDialog, DocumentType } from './document/DocumentUploadDialog';

interface DocumentsTabProps {
  provider: ServiceProvider;
  searchQuery?: string;
  onDocumentUploaded?: (document: ProviderDocument) => void;
}

export function DocumentsTab({ provider, searchQuery = '', onDocumentUploaded }: DocumentsTabProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (file: File, documentType: DocumentType, documentDescription: string) => {
    if (!file || !documentType || !documentDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${provider.id}/${documentType}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('provider-files')
        .upload(filePath, file);

      if (error) throw error;

      // Get the public URL for the file
      const { data: { publicUrl } } = supabase.storage
        .from('provider-files')
        .getPublicUrl(filePath);

      // Add the document to the provider's documents array
      const newDocument: ProviderDocument = {
        id: `doc-${Date.now()}`,
        type: documentType,
        url: publicUrl,
        description: documentDescription,
        uploadedAt: new Date().toISOString(),
        status: 'pending'
      };

      if (onDocumentUploaded) {
        onDocumentUploaded(newDocument);
      }

      toast({
        title: "Document uploaded",
        description: "The document was successfully uploaded",
      });

      // Close dialog
      setUploadDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            {searchQuery
              ? `Showing ${provider.documents.length} matching documents`
              : 'Uploaded documents and verifications'
            }
          </CardDescription>
        </div>
        <DocumentUploadDialog
          open={uploadDialogOpen}
          onOpenChange={setUploadDialogOpen}
          onUpload={handleUpload}
          uploading={uploading}
        />
      </CardHeader>
      <CardContent>
        <DocumentList 
          provider={provider} 
          searchQuery={searchQuery} 
          onUploadClick={() => setUploadDialogOpen(true)}
        />
      </CardContent>
    </Card>
  );
}
