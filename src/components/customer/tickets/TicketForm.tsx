
import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Upload, X, FileText, Image, Paperclip } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface TicketFormProps {
  onSubmit: (title: string, description: string, attachments: File[]) => void
}

export function TicketForm({ onSubmit }: TicketFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }
    
    onSubmit(title, description, attachments)
    setTitle('')
    setDescription('')
    setAttachments([])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    // Filter for allowed file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    const maxFileSize = 5 * 1024 * 1024 // 5MB

    const selectedFiles = Array.from(fileList).filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type. Please upload JPG, PNG, or PDF files.`,
          variant: "destructive"
        })
        return false
      }
      
      if (file.size > maxFileSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 5MB size limit.`,
          variant: "destructive"
        })
        return false
      }
      
      return true
    })

    setAttachments(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return <Image className="h-4 w-4" />
    } else if (fileType.includes('pdf')) {
      return <FileText className="h-4 w-4" />
    } else {
      return <Paperclip className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a New Ticket</CardTitle>
        <CardDescription>
          Please provide details about your issue or question.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Brief description of your issue" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Please provide all the details about your issue..." 
              className="min-h-[200px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div 
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF (max 5MB)</p>
              <Input 
                id="file-upload"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          {attachments.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files</Label>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(file.type)}
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round(file.size / 1024)}KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Button type="submit" className="w-full">Submit Ticket</Button>
        </form>
      </CardContent>
    </Card>
  )
}
