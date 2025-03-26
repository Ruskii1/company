
import { useRef } from 'react'
import { Transaction } from '@/types/transaction'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FileUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ReceiptUploadDialogProps {
  transaction: Transaction
  onUploadReceipt: (transactionId: string, file: File | null) => void
}

export const ReceiptUploadDialog = ({ 
  transaction,
  onUploadReceipt
}: ReceiptUploadDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      // Validate file is PDF or image
      if (!file.type.match('application/pdf|image/jpeg|image/png|image/jpg')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file",
          variant: "destructive"
        })
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size should not exceed 5MB",
          variant: "destructive"
        })
        return
      }
    }
    onUploadReceipt(transaction.id, file)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Transaction Receipt</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <FileUp className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Drop file here or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">PDF, JPG, JPEG, PNG (max 5MB)</p>
          <Input 
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => fileInputRef.current?.click()}
          >
            Select File
          </Button>
        </div>
        {transaction.receipt && (
          <div className="bg-muted p-2 rounded flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              <span className="text-sm truncate max-w-[200px]">
                {transaction.receipt.name}
              </span>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onUploadReceipt(transaction.id, null)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  )
}
