
import { useState } from 'react'
import { CustomerTicket, TicketReply } from '@/types/customerTicket'
import { useToast } from '@/hooks/use-toast'

// Initial mock tickets
const initialTickets: CustomerTicket[] = [
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
]

export function useCustomerTickets() {
  const [tickets, setTickets] = useState<CustomerTicket[]>(initialTickets)
  const { toast } = useToast()

  const addTicket = (title: string, description: string) => {
    const newTicket: CustomerTicket = {
      id: `ticket#${1000 + tickets.length + 1}`,
      title,
      description,
      status: 'open',
      createdAt: new Date(),
      replies: []
    }
    
    setTickets([...tickets, newTicket])
    
    toast({
      title: "Success",
      description: "Your ticket has been submitted successfully",
    })
    
    return newTicket
  }

  const addReply = (ticketId: string, content: string) => {
    if (!content) return
    
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const updatedTicket = { ...ticket }
        if (!updatedTicket.replies) updatedTicket.replies = []
        updatedTicket.replies.push({
          content,
          from: 'customer',
          createdAt: new Date()
        })
        return updatedTicket
      }
      return ticket
    })
    
    setTickets(updatedTickets)
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully",
    })
  }

  return {
    tickets,
    addTicket,
    addReply
  }
}
