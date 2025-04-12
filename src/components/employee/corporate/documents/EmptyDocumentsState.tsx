
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface EmptyDocumentsStateProps {
  onUploadClick: () => void;
}

export const EmptyDocumentsState = ({ onUploadClick }: EmptyDocumentsStateProps) => {
  return (
    <div className="text-center py-12 border-2 border-dashed rounded-md">
      <Upload className="h-12 w-12 mx-auto text-gray-400" />
      <h3 className="mt-2 text-lg font-semibold">No documents uploaded</h3>
      <p className="text-sm text-muted-foreground">
        Upload company documents to start building your document library.
      </p>
      <Button variant="outline" className="mt-4" onClick={onUploadClick}>
        Upload Document
      </Button>
    </div>
  );
};
