
import { useState } from 'react'
import { CustomerTicket, TicketReply, TicketAttachment } from '@/types/customerTicket'
import { useToast } from '@/hooks/use-toast'
import { v4 as uuidv4 } from 'uuid'

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

// Mock function to simulate file uploads
const uploadFile = async (file: File): Promise<TicketAttachment> => {
  // In a real implementation, this would upload to a server or storage service
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({
        id: uuidv4(),
        fileName: file.name,
        fileType: file.type,
        fileUrl: URL.createObjectURL(file), // This creates a temporary URL for preview
        uploadedAt: new Date()
      })
    }, 500)
  })
}

export function useCustomerTickets() {
  const [tickets, setTickets] = useState<CustomerTicket[]>(initialTickets)
  const { toast } = useToast()

  const addTicket = async (title: string, description: string, files: File[] = []) => {
    // Handle file attachments if provided
    let attachments: TicketAttachment[] = []
    if (files.length > 0) {
      try {
        // Upload files and get attachment metadata
        attachments = await Promise.all(files.map(file => uploadFile(file)))
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "There was an error uploading your files. Please try again.",
          variant: "destructive"
        })
      }
    }

    const newTicket: CustomerTicket = {
      id: `ticket#${1000 + tickets.length + 1}`,
      title,
      description,
      status: 'open',
      createdAt: new Date(),
      replies: [],
      attachments: attachments.length > 0 ? attachments : undefined
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
