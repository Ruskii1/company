
export type TicketStatus = 'open' | 'closed'

export interface TicketReply {
  content: string
  from: 'customer' | 'support'
  createdAt: Date
}

export interface TicketAttachment {
  id: string
  fileName: string
  fileType: string
  fileUrl: string
  uploadedAt: Date
}

export interface CustomerTicket {
  id: string
  title: string
  description: string
  status: TicketStatus
  createdAt: Date
  replies?: TicketReply[]
  attachments?: TicketAttachment[]
}
