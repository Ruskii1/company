
import { useState } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { OrderFormValues } from "./types"
import { Input } from "@/components/ui/input"
import { Upload, X, File } from "lucide-react"
import { Button } from "@/components/ui/button"

type FileUploadFieldProps = {
  control: Control<OrderFormValues>
}

export const FileUploadField = ({ control }: FileUploadFieldProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [previewFiles, setPreviewFiles] = useState<File[]>([])

  const onFilesSelected = (
    onChange: (value: File[]) => void,
    files: FileList | null
  ) => {
    if (!files) return

    // Convert FileList to Array and validate files (PDF, JPG, PNG)
    const fileArray = Array.from(files).filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      const isValidType = validTypes.includes(file.type)
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB max
      return isValidType && isValidSize
    })

    setPreviewFiles(prev => [...prev, ...fileArray])
    onChange(fileArray)
  }

  const removeFile = (
    onChange: (value: File[]) => void,
    index: number
  ) => {
    const updatedFiles = [...previewFiles]
    updatedFiles.splice(index, 1)
    setPreviewFiles(updatedFiles)
    onChange(updatedFiles)
  }

  return (
    <FormField
      control={control}
      name="attachments"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t.attachments} ({t.optional})</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">{t.dropFilesHere}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.allowedFileTypes}</p>
                <p className="text-xs text-muted-foreground">{t.maximumFileSize}</p>
                <Input 
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => onFilesSelected(field.onChange, e.target.files)}
                />
              </div>

              {previewFiles.length > 0 && (
                <div className="space-y-2">
                  {previewFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center space-x-2">
                        <File className="h-4 w-4" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(field.onChange, index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
