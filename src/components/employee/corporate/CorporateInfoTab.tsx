
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CorporateAccount } from "@/types/corporate";
import { Upload, FileText, File, Image, FileIcon, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface CorporateInfoTabProps {
  account: CorporateAccount;
}

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
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
  
  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) {
      return <Image className="h-8 w-8 text-blue-500" />;
    } else if (fileType.includes("pdf")) {
      return <FileIcon className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return <FileText className="h-8 w-8 text-blue-700" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };
  
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
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Company Documents</CardTitle>
          <div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              <label className="cursor-pointer">
                Upload File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-md">
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-semibold">No documents uploaded</h3>
            <p className="text-sm text-muted-foreground">
              Upload company documents to start building your document library.
            </p>
            <Button variant="outline" className="mt-4">
              <label className="cursor-pointer">
                Upload Document
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  {getFileIcon(doc.type)}
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-left">
                          <p className="font-medium hover:underline">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.size} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{doc.name}</DialogTitle>
                        </DialogHeader>
                        <div className="p-4 h-[70vh] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                          {doc.type.includes("image") ? (
                            <div className="max-h-full">
                              <img 
                                src={doc.url} 
                                alt={doc.name} 
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="text-center">
                              {getFileIcon(doc.type)}
                              <p className="mt-4">
                                Preview not available for this file type.
                              </p>
                              <Button className="mt-4">
                                Download File
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={() => handleDeleteFile(doc.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
