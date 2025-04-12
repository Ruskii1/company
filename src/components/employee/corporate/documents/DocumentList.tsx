
import { Button } from "@/components/ui/button";
import { DocumentFile } from "@/types/corporate";
import { FileIcon, FileText, Image, Trash2 } from "lucide-react";
import { DocumentPreviewDialog } from "./DocumentPreviewDialog";

interface DocumentListProps {
  documents: DocumentFile[];
  onDeleteFile: (documentId: string) => void;
  emptyState?: React.ReactNode;
}

export const getFileIcon = (fileType: string) => {
  if (fileType.includes("image")) {
    return <Image className="h-8 w-8 text-blue-500" />;
  } else if (fileType.includes("pdf")) {
    return <FileIcon className="h-8 w-8 text-red-500" />;
  } else if (fileType.includes("word") || fileType.includes("document")) {
    return <FileText className="h-8 w-8 text-blue-700" />;
  } else {
    return <FileIcon className="h-8 w-8 text-gray-500" />;
  }
};

export const DocumentList = ({ documents, onDeleteFile, emptyState }: DocumentListProps) => {
  if (documents.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center space-x-4">
            {getFileIcon(doc.type)}
            <div>
              <DocumentPreviewDialog document={doc} />
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
            onClick={() => onDeleteFile(doc.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
