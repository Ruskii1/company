import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Ticket, MessageSquare } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

type TicketStatus = 'open' | 'closed'

interface CustomerTicket {
  id: string
  title: string
  description: string
  status: TicketStatus
  createdAt: Date
  replies?: {
    content: string
    from: 'customer' | 'support'
    createdAt: Date
  }[]
}

const Tickets = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [activeTicket, setActiveTicket] = useState<CustomerTicket | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [tickets, setTickets] = useState<CustomerTicket[]>([
    {
      id: 'ticket#1001',
      title: 'Late delivery issue',
      description: 'My package was supposed to arrive yesterday but it still hasn\'t been delivered.',
      status: 'open',
      createdAt: new Date(2023, 8, 10),
      replies: [
        {
          content: 'We apologize for the delay. We are looking into this issue right now.',
          from: 'support',
          createdAt: new Date(2023, 8, 11)
        },
        {
          content: 'Thank you for looking into this. Please let me know when it will be delivered.',
          from: 'customer',
          createdAt: new Date(2023, 8, 11)
        }
      ]
    },
    {
      id: 'ticket#1002',
      title: 'Billing question',
      description: 'I have a question about my last invoice. There seems to be an extra charge.',
      status: 'closed',
      createdAt: new Date(2023, 8, 5),
      replies: [
        {
          content: 'Thanks for reaching out. The extra charge was for express delivery that was requested.',
          from: 'support',
          createdAt: new Date(2023, 8, 6)
        },
        {
          content: 'I understand now. Thank you for the clarification.',
          from: 'customer',
          createdAt: new Date(2023, 8, 6)
        }
      ]
    }
  ])

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }
    
    const newTicket: CustomerTicket = {
      id: `ticket#${1000 + tickets.length + 1}`,
      title,
      description,
      status: 'open',
      createdAt: new Date(),
      replies: []
    }
    
    setTickets([...tickets, newTicket])
    setTitle('')
    setDescription('')
    
    toast({
      title: "Success",
      description: "Your ticket has been submitted successfully",
    })
  }

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyContent || !activeTicket) return
    
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === activeTicket.id) {
        const updatedTicket = { ...ticket }
        if (!updatedTicket.replies) updatedTicket.replies = []
        updatedTicket.replies.push({
          content: replyContent,
          from: 'customer',
          createdAt: new Date()
        })
        return updatedTicket
      }
      return ticket
    })
    
    setTickets(updatedTickets)
    setReplyContent('')
    setActiveTicket(updatedTickets.find(t => t.id === activeTicket.id) || null)
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully",
    })
  }

  const viewTicket = (ticket: CustomerTicket) => {
    setActiveTicket(ticket)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.tickets}</h1>
      
      {activeTicket ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  {activeTicket.title}
                </CardTitle>
                <CardDescription>
                  {activeTicket.id} - Created on {activeTicket.createdAt.toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge variant={activeTicket.status === 'open' ? 'default' : 'secondary'}>
                {activeTicket.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p>{activeTicket.description}</p>
            </div>
            
            {activeTicket.replies && activeTicket.replies.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Conversation</h3>
                {activeTicket.replies.map((reply, index) => (
                  <div 
                    key={index} 
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
                ))}
              </div>
            )}
            
            {activeTicket.status === 'open' && (
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
                    onClick={() => setActiveTicket(null)}
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
          {activeTicket.status === 'closed' && (
            <CardFooter className="justify-end">
              <Button
                variant="outline"
                onClick={() => setActiveTicket(null)}
              >
                Back to Tickets
              </Button>
            </CardFooter>
          )}
        </Card>
      ) : (
        <Tabs defaultValue="my-tickets">
          <TabsList>
            <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-tickets" className="space-y-4 pt-4">
            {tickets.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">You don't have any tickets yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {tickets.map(ticket => (
                  <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => viewTicket(ticket)}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          {ticket.title}
                        </CardTitle>
                        <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {ticket.id} - {ticket.createdAt.toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2">{ticket.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="ml-auto" onClick={(e) => {
                        e.stopPropagation();
                        viewTicket(ticket);
                      }}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new-ticket" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Submit a New Ticket</CardTitle>
                <CardDescription>
                  Please provide details about your issue or question.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
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
                  <Button type="submit" className="w-full">Submit Ticket</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default Tickets
