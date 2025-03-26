
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare } from 'lucide-react'
import { CustomerTicket } from '@/types/customerTicket'

interface TicketsListProps {
  tickets: CustomerTicket[]
  onViewTicket: (ticket: CustomerTicket) => void
}

export function TicketsList({ tickets, onViewTicket }: TicketsListProps) {
  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">You don't have any tickets yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {tickets.map(ticket => (
        <Card 
          key={ticket.id} 
          className="cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => onViewTicket(ticket)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="text-lg flex items-center gap-2 font-medium">
                <MessageSquare className="h-4 w-4" />
                {ticket.title}
              </div>
              <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                {ticket.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {ticket.id} - {ticket.createdAt.toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2">{ticket.description}</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="ghost" 
              className="ml-auto" 
              onClick={(e) => {
                e.stopPropagation();
                onViewTicket(ticket);
              }}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
