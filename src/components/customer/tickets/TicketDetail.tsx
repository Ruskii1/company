
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CustomerTicket, TicketAttachment } from '@/types/customerTicket'
import { ArrowLeft, FileText, Image, Paperclip } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Separator } from '@/components/ui/separator'
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger
} from '@/components/ui/drawer'

interface TicketDetailProps {
  ticket: CustomerTicket
  onBack: () => void
  onReply: (content: string) => void
}

export function TicketDetail({ ticket, onBack, onReply }: TicketDetailProps) {
  const [replyContent, setReplyContent] = useState('')
  const [selectedAttachment, setSelectedAttachment] = useState<TicketAttachment | null>(null)

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return
    
    onReply(replyContent)
    setReplyContent('')
  }

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM d, yyyy h:mm a')
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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold flex-1">{ticket.title}</h2>
        <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
          {ticket.status.toUpperCase()}
        </Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="mt-1 text-muted-foreground">{ticket.description}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Submitted on {formatDate(ticket.createdAt)}
            </p>
          </div>
          
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {ticket.attachments.map((attachment) => (
                  <Drawer key={attachment.id}>
                    <DrawerTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => setSelectedAttachment(attachment)}
                      >
                        {getFileIcon(attachment.fileType)}
                        <span className="text-xs truncate max-w-[140px]">
                          {attachment.fileName}
                        </span>
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">{attachment.fileName}</h3>
                        {attachment.fileType.includes('image') ? (
                          <div className="flex justify-center border rounded-lg overflow-hidden">
                            <img 
                              src={attachment.fileUrl} 
                              alt={attachment.fileName}
                              className="max-h-[500px] object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center p-8 border rounded-lg">
                            <div className="text-center">
                              <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                              <p className="mt-2">
                                <a 
                                  href={attachment.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  Open PDF
                                </a>
                              </p>
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Uploaded on {formatDate(attachment.uploadedAt)}
                        </p>
                      </div>
                    </DrawerContent>
                  </Drawer>
                ))}
              </div>
            </div>
          )}
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Conversation</h3>
            {ticket.replies && ticket.replies.length > 0 ? (
              <div className="space-y-4">
                {ticket.replies.map((reply, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg ${
                      reply.from === 'customer' 
                        ? 'bg-primary/10 ml-8' 
                        : 'bg-secondary/10 mr-8'
                    }`}
                  >
                    <p>{reply.content}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex justify-between">
                      <span>{reply.from === 'customer' ? 'You' : 'Support Agent'}</span>
                      <span>{formatDate(reply.createdAt)}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No replies yet.</p>
            )}
          </div>
          
          <form onSubmit={handleSubmitReply} className="pt-4">
            <Textarea
              placeholder="Write your reply here..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[120px] mb-2"
            />
            <Button type="submit" disabled={!replyContent.trim()}>
              Send Reply
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
