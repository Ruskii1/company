
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React from "react";

interface FileUploadButtonProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadButton = ({ onFileUpload }: FileUploadButtonProps) => {
  return (
    <Button>
      <Upload className="mr-2 h-4 w-4" />
      <label className="cursor-pointer">
        Upload File
        <input
          type="file"
          className="hidden"
          onChange={onFileUpload}
        />
      </label>
    </Button>
  );
};
