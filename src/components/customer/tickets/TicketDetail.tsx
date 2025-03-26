
import { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Ticket } from 'lucide-react'
import { CustomerTicket, TicketReply } from '@/types/customerTicket'

interface TicketDetailProps {
  ticket: CustomerTicket
  onBack: () => void
  onReply: (content: string) => void
}

export function TicketDetail({ ticket, onBack, onReply }: TicketDetailProps) {
  const [replyContent, setReplyContent] = useState('')

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyContent) return
    
    onReply(replyContent)
    setReplyContent('')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              {ticket.title}
            </CardTitle>
            <CardDescription>
              {ticket.id} - Created on {ticket.createdAt.toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
            {ticket.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <p>{ticket.description}</p>
        </div>
        
        {ticket.replies && ticket.replies.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Conversation</h3>
            {ticket.replies.map((reply, index) => (
              <ReplyItem key={index} reply={reply} />
            ))}
          </div>
        )}
        
        {ticket.status === 'open' && (
          <form onSubmit={handleReply} className="space-y-4">
            <Textarea 
              placeholder="Type your reply here..." 
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
              >
                Back to Tickets
              </Button>
              <Button type="submit" disabled={!replyContent}>
                Send Reply
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      {ticket.status === 'closed' && (
        <CardFooter className="justify-end">
          <Button
            variant="outline"
            onClick={onBack}
          >
            Back to Tickets
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

interface ReplyItemProps {
  reply: TicketReply
}

function ReplyItem({ reply }: ReplyItemProps) {
  return (
    <div 
      className={`p-4 rounded-lg ${
        reply.from === 'customer' 
          ? 'bg-muted ml-12' 
          : 'bg-primary/10 mr-12'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">
          {reply.from === 'customer' ? 'You' : 'Support Agent'}
        </span>
        <span className="text-xs text-muted-foreground">
          {reply.createdAt.toLocaleString()}
        </span>
      </div>
      <p>{reply.content}</p>
    </div>
  )
}
