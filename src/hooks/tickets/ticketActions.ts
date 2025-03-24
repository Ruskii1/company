
import { v4 as uuidv4 } from 'uuid';
import { Ticket, TicketTag, TicketNote, TicketTagChange } from '@/types/ticket';
import { currentUser } from './mockTickets';

export const addNoteToTicket = (ticket: Ticket, content: string): Ticket => {
  const newNote: TicketNote = {
    id: uuidv4(),
    content,
    createdAt: new Date(),
    createdBy: currentUser
  };
  
  return {
    ...ticket,
    notes: [...ticket.notes, newNote]
  };
};

export const addTagToTicket = (ticket: Ticket, tag: TicketTag): Ticket | undefined => {
  // Only add the tag if it doesn't already exist
  if (!ticket.tags.includes(tag)) {
    const newTagChange: TicketTagChange = {
      id: uuidv4(),
      tag,
      addedAt: new Date(),
      addedBy: currentUser
    };
    
    return {
      ...ticket,
      tags: [...ticket.tags, tag],
      tagChanges: [...ticket.tagChanges, newTagChange]
    };
  }
  
  return undefined; // No changes needed
};

export const removeTagFromTicket = (ticket: Ticket, tag: TicketTag): Ticket => {
  return {
    ...ticket,
    tags: ticket.tags.filter(t => t !== tag)
  };
};

export const closeTicketById = (ticket: Ticket): Ticket | undefined => {
  // Only close if the ticket is open
  if (ticket.status === 'open') {
    return {
      ...ticket,
      status: 'closed',
      closedAt: new Date(),
      closedBy: currentUser
    };
  }
  
  return undefined; // No changes needed
};

export const filterTicketsByTag = (tickets: Ticket[], tag: TicketTag | 'all'): Ticket[] => {
  if (tag === 'all') {
    return tickets;
  }
  return tickets.filter(ticket => ticket.tags.includes(tag));
};
