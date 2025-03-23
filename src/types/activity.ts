
export interface Activity {
  id: string
  description: string
  type: 'ticket' | 'request' | 'edit'
  entityType: 'Ticket' | 'Request' | 'Order'
  entityId: string
  timestamp: string
  userId: string
}
