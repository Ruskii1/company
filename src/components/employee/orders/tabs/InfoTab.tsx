
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, FileText, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Order } from "@/types/order"
import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface InfoTabProps {
  order: Order
  userRole: 'admin' | 'employee' | 'provider' | 'client'
}

export const InfoTab = ({ order, userRole }: InfoTabProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  
  const canUploadDocuments = userRole === 'admin' || userRole === 'employee'
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    const selectedFiles = Array.from(e.target.files)
    
    // Check file types
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png']
    const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      toast.error('Only PDF, JPEG and PNG files are allowed')
      return
    }
    
    // Check file size (5MB limit)
    const tooLargeFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024)
    
    if (tooLargeFiles.length > 0) {
      toast.error('Files must be smaller than 5MB')
      return
    }
    
    setFiles(prev => [...prev, ...selectedFiles])
  }
  
  const handleUpload = () => {
    if (files.length === 0) return
    
    // In a real app, this would upload the files to the server
    console.log('Uploading files:', files)
    toast.success(`${files.length} files uploaded successfully`)
    setFiles([])
    setOpen(false)
  }
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }
  
  // Show placeholder if no documents/info is available
  const hasDocuments = order.documents && order.documents.length > 0
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Order Information
        </CardTitle>
        
        {canUploadDocuments && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <FileUp className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <Label htmlFor="files">
                  Select Files (PDF, JPEG, PNG - max 5MB)
                </Label>
                <Input 
                  id="files" 
                  type="file" 
                  multiple 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                
                {files.length > 0 && (
                  <div className="border rounded-md p-3 space-y-2">
                    <p className="text-sm font-medium">Selected Files:</p>
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                          <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleUpload}
                  disabled={files.length === 0}
                >
                  Upload
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {hasDocuments ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.documents?.map((doc, index) => (
              <div key={index} className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1 truncate">
                    <p className="font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.uploadedAt}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No documents available for this order</p>
            
            {canUploadDocuments && (
              <Button className="mt-4" variant="outline" onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Document
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
