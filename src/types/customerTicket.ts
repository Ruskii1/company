
export type TicketStatus = 'open' | 'closed'

export interface TicketReply {
  content: string
  from: 'customer' | 'support'
  createdAt: Date
}

export interface CustomerTicket {
  id: string
  title: string
  description: string
  status: TicketStatus
  createdAt: Date
  replies?: TicketReply[]
}
