
import React, { useState } from 'react';
import { ServiceProvider, Document as ProviderDocument } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DocumentList } from './document/DocumentList';
import { DocumentUploadDialog } from './document/DocumentUploadDialog';
import { DocumentType } from '@/hooks/providers/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { DocumentFilter } from './document/DocumentFilter';

interface DocumentsTabProps {
  provider: ServiceProvider;
  onDocumentUploaded?: (document: ProviderDocument) => void;
}

export function DocumentsTab({ provider, onDocumentUploaded }: DocumentsTabProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState<DocumentType[]>([]);
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

  // Filter documents based on search query and selected document types
  const filteredDocuments = React.useMemo(() => {
    let filtered = provider.documents;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply document type filter
    if (selectedDocumentTypes.length > 0) {
      filtered = filtered.filter(doc => 
        selectedDocumentTypes.includes(doc.type as DocumentType)
      );
    }
    
    return filtered;
  }, [provider.documents, searchQuery, selectedDocumentTypes]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length !== provider.documents.length
              ? `Showing ${filteredDocuments.length} of ${provider.documents.length} documents`
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
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DocumentFilter 
              onFilterChange={setSelectedDocumentTypes} 
              selectedTypes={selectedDocumentTypes}
            />
          </div>
          
          <DocumentList 
            provider={provider} 
            documents={filteredDocuments}
            onUploadClick={() => setUploadDialogOpen(true)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
