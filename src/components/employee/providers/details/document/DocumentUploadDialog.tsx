
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

export type DocumentType = 'national_id' | 'drivers_license' | 'vehicle_registration' | 'equipment' | 'truck' | 'insurance' | 'operational_license' | 'other';

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (file: File, type: DocumentType, description: string) => Promise<void>;
  uploading: boolean;
}

export function DocumentUploadDialog({ 
  open, 
  onOpenChange, 
  onUpload, 
  uploading 
}: DocumentUploadDialogProps) {
  const [documentType, setDocumentType] = useState<DocumentType>('national_id');
  const [documentDescription, setDocumentDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value as DocumentType);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await onUpload(selectedFile, documentType, documentDescription);
      // Reset form
      setSelectedFile(null);
      setDocumentDescription('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Select 
              value={documentType} 
              onValueChange={handleDocumentTypeChange}
            >
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
            onClick={() => onOpenChange(false)}
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
  );
}
