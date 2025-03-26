
import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TicketsList } from '@/components/customer/tickets/TicketsList'
import { TicketDetail } from '@/components/customer/tickets/TicketDetail'
import { TicketForm } from '@/components/customer/tickets/TicketForm'
import { useCustomerTickets } from '@/hooks/useCustomerTickets'
import { CustomerTicket } from '@/types/customerTicket'

const Tickets = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { tickets, addTicket, addReply } = useCustomerTickets()
  const [activeTicket, setActiveTicket] = useState<CustomerTicket | null>(null)

  const viewTicket = (ticket: CustomerTicket) => {
    setActiveTicket(ticket)
  }

  const handleSubmitTicket = (title: string, description: string, attachments: File[]) => {
    addTicket(title, description, attachments)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.tickets}</h1>
      
      {activeTicket ? (
        <TicketDetail 
          ticket={activeTicket} 
          onBack={() => setActiveTicket(null)} 
          onReply={(content) => addReply(activeTicket.id, content)}
        />
      ) : (
        <Tabs defaultValue="my-tickets">
          <TabsList>
            <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-tickets" className="space-y-4 pt-4">
            <TicketsList 
              tickets={tickets} 
              onViewTicket={viewTicket} 
            />
          </TabsContent>
          
          <TabsContent value="new-ticket" className="space-y-4 pt-4">
            <TicketForm onSubmit={handleSubmitTicket} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default Tickets
