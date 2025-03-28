
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguageStore, translations } from '@/lib/i18n';
import { Invoice } from '@/types/finance';
import { Send } from 'lucide-react';

interface SendInvoiceEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInvoice: Invoice | null;
  onSendEmail: (email: string) => Promise<void>;
}

export function SendInvoiceEmailDialog({ 
  open, 
  onOpenChange, 
  selectedInvoice,
  onSendEmail
}: SendInvoiceEmailDialogProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    if (!email) return;

    setIsSending(true);
    try {
      await onSendEmail(email);
      setEmail('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.sendInvoiceViaEmail}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t.recipientEmail}</Label>
            <Input
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {t.invoiceToSend}: {selectedInvoice?.invoiceNumber}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t.cancel}</Button>
          </DialogClose>
          <Button 
            onClick={handleSendEmail} 
            disabled={!email || isSending}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            {isSending ? t.sending : t.sendEmail}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
