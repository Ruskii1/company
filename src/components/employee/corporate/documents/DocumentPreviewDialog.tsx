
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DocumentFile } from "@/types/corporate";
import { getFileIcon } from "./DocumentList";

interface DocumentPreviewDialogProps {
  document: DocumentFile;
}

export const DocumentPreviewDialog = ({ document }: DocumentPreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-left">
          <p className="font-medium hover:underline">{document.name}</p>
          <p className="text-sm text-muted-foreground">
            {document.size} • Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{document.name}</DialogTitle>
        </DialogHeader>
        <div className="p-4 h-[70vh] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
          {document.type.includes("image") ? (
            <div className="max-h-full">
              <img 
                src={document.url} 
                alt={document.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="text-center">
              {getFileIcon(document.type)}
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
  );
};
