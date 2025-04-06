
import React, { useState } from 'react';
import { ServiceProvider, Document as ProviderDocument } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileIcon, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentsTabProps {
  provider: ServiceProvider;
  searchQuery?: string;
  onDocumentUploaded?: (document: ProviderDocument) => void;
}

export function DocumentsTab({ provider, searchQuery = '', onDocumentUploaded }: DocumentsTabProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [documentType, setDocumentType] = useState<'national_id' | 'drivers_license' | 'vehicle_registration' | 'equipment' | 'truck' | 'insurance' | 'operational_license' | 'other'>('national_id');
  const [documentDescription, setDocumentDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    if (!documentType || !documentDescription) {
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
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${provider.id}/${documentType}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('provider-files')
        .upload(filePath, selectedFile);

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

      // Reset form
      setSelectedFile(null);
      setDocumentDescription('');
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
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a new document for this provider. The document will be reviewed by an administrator.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="documentType">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national_id">National ID</SelectItem>
                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                    <SelectItem value="vehicle_registration">Vehicle Registration</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="operational_license">Operational License</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter document description"
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="file">File</Label>
                <Input 
                  id="file" 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setUploadDialogOpen(false)}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpload} 
                disabled={uploading || !selectedFile}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {provider.documents.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            {searchQuery ? 'No documents match your search' : 'No documents found'}
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Upload size={16} />
                Upload Document
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provider.documents.map((document) => (
              <div key={document.id} className="border rounded-md p-4 flex items-start gap-3">
                <div className="bg-muted h-12 w-12 rounded-md flex items-center justify-center shrink-0">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium capitalize mb-1">{document.type.replace('_', ' ')}</h4>
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
                      </p>
                      {document.url && (
                        <a 
                          href={document.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-1 inline-block"
                        >
                          View document
                        </a>
                      )}
                    </div>
                    <div>{getStatusBadge(document.status)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
