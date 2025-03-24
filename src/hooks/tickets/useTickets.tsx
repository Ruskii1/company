
import { useState } from 'react';
import { Ticket, TicketTag } from '@/types/ticket';
import { useToast } from '@/hooks/use-toast';
import { initialTickets } from './mockTickets';
import {
  addNoteToTicket,
  addTagToTicket,
  removeTagFromTicket,
  closeTicketById,
  filterTicketsByTag
} from './ticketActions';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const { toast } = useToast();

  const addNote = (ticketId: string, content: string) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticket.id === ticketId) {
          return addNoteToTicket(ticket, content);
        }
        return ticket;
      })
    );
    
    toast({
      title: "Note added",
      description: "Your note has been added to the ticket.",
    });
  };

  const addTag = (ticketId: string, tag: TicketTag) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticket.id === ticketId) {
          const updatedTicket = addTagToTicket(ticket, tag);
          return updatedTicket || ticket;
        }
        return ticket;
      })
    );
    
    toast({
      title: "Tag added",
      description: `Tag ${tag} has been added to the ticket.`,
    });
  };

  const removeTag = (ticketId: string, tag: TicketTag) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticket.id === ticketId) {
          return removeTagFromTicket(ticket, tag);
        }
        return ticket;
      })
    );
    
    toast({
      title: "Tag removed",
      description: `Tag ${tag} has been removed from the ticket.`,
    });
  };

  const closeTicket = (ticketId: string) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticket.id === ticketId) {
          const updatedTicket = closeTicketById(ticket);
          return updatedTicket || ticket;
        }
        return ticket;
      })
    );
    
    toast({
      title: "Ticket closed",
      description: "The ticket has been closed successfully.",
    });
  };

  return {
    tickets,
    addNote,
    addTag,
    removeTag,
    closeTicket,
    filterTicketsByTag: (tag: TicketTag | 'all') => filterTicketsByTag(tickets, tag)
  };
};
