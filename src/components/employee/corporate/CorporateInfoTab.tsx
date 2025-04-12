
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CorporateAccount } from "@/types/corporate";
import { DocumentFile } from "@/types/corporate";
import { useToast } from "@/hooks/use-toast";
import { DocumentList } from "./documents/DocumentList";
import { EmptyDocumentsState } from "./documents/EmptyDocumentsState";
import { FileUploadButton } from "./documents/FileUploadButton";

interface CorporateInfoTabProps {
  account: CorporateAccount;
}

export const CorporateInfoTab = ({ account }: CorporateInfoTabProps) => {
  // Mocked documents for demonstration
  const [documents, setDocuments] = useState<DocumentFile[]>([
    {
      id: "doc-1",
      name: "company_registration.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      uploadedBy: "Admin User",
      uploadedAt: "2023-12-05T14:30:00",
      url: "#"
    },
    {
      id: "doc-2",
      name: "service_agreement.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "1.1 MB",
      uploadedBy: "Admin User",
      uploadedAt: "2023-12-10T11:15:00",
      url: "#"
    },
    {
      id: "doc-3",
      name: "company_logo.png",
      type: "image/png",
      size: "0.5 MB",
      uploadedBy: "Admin User",
      uploadedAt: "2023-12-01T09:45:00",
      url: "#"
    }
  ]);
  
  const { toast } = useToast();
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // Mock adding the file to our list
    const newFile = files[0];
    const newDocument: DocumentFile = {
      id: `doc-${Date.now()}`,
      name: newFile.name,
      type: newFile.type,
      size: `${(newFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedBy: "Admin User",
      uploadedAt: new Date().toISOString(),
      url: "#"
    };
    
    setDocuments([...documents, newDocument]);
    
    toast({
      title: "File Uploaded",
      description: `${newFile.name} has been successfully uploaded.`,
    });
    
    // Reset input
    event.target.value = "";
  };
  
  const handleDeleteFile = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
    
    toast({
      title: "File Deleted",
      description: "The file has been successfully deleted.",
    });
  };

  const handleEmptyStateUpload = () => {
    // Simulate click on the hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', (e) => handleFileUpload(e as React.ChangeEvent<HTMLInputElement>));
    fileInput.click();
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Company Documents</CardTitle>
          <div>
            <FileUploadButton onFileUpload={handleFileUpload} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DocumentList 
          documents={documents} 
          onDeleteFile={handleDeleteFile}
          emptyState={
            <EmptyDocumentsState onUploadClick={handleEmptyStateUpload} />
          }
        />
      </CardContent>
    </Card>
  );
};
