
import { useState } from 'react';
import { Ticket, TicketTag, TicketNote, TicketTagChange } from '@/types/ticket';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

// Mock user for demonstration
const currentUser = 'John Doe';

// Mock initial tickets
const initialTickets: Ticket[] = [
  {
    id: '1',
    title: 'System Login Issue',
    description: 'Users are experiencing intermittent login failures on the provider portal.',
    status: 'open',
    tags: ['#IT', '#High Priority'],
    notes: [
      {
        id: '101',
        content: 'Investigating the authentication service.',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        createdBy: 'Jane Smith'
      }
    ],
    tagChanges: [
      {
        id: '201',
        tag: '#IT',
        addedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        addedBy: 'Jane Smith'
      },
      {
        id: '202',
        tag: '#High Priority',
        addedAt: new Date(Date.now() - 86400000), // 1 day ago
        addedBy: 'Jane Smith'
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    createdBy: 'Mike Johnson'
  },
  {
    id: '2',
    title: 'Payment Processing Delay',
    description: 'Customers reporting delays in payment processing for corporate accounts.',
    status: 'open',
    tags: ['#Finance', '#Corporates'],
    notes: [],
    tagChanges: [
      {
        id: '203',
        tag: '#Finance',
        addedAt: new Date(Date.now() - 86400000 * 1.5), // 1.5 days ago
        addedBy: 'Alex Wang'
      },
      {
        id: '204',
        tag: '#Corporates',
        addedAt: new Date(Date.now() - 86400000 * 1.5), // 1.5 days ago
        addedBy: 'Alex Wang'
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    createdBy: 'Alex Wang'
  },
  {
    id: '3',
    title: 'Driver Scheduling Conflict',
    description: 'Multiple drivers assigned to the same pickup slot.',
    status: 'closed',
    tags: ['#Operations', '#Scedule'],
    notes: [
      {
        id: '102',
        content: 'Identified the issue in the scheduling algorithm.',
        createdAt: new Date(Date.now() - 86400000 * 0.7), // 0.7 days ago
        createdBy: 'Sarah Johnson'
      },
      {
        id: '103',
        content: 'Fixed the conflict and updated the schedule.',
        createdAt: new Date(Date.now() - 86400000 * 0.3), // 0.3 days ago
        createdBy: 'Dev Team'
      }
    ],
    tagChanges: [
      {
        id: '205',
        tag: '#Operations',
        addedAt: new Date(Date.now() - 86400000), // 1 day ago
        addedBy: 'Sarah Johnson'
      },
      {
        id: '206',
        tag: '#Scedule',
        addedAt: new Date(Date.now() - 86400000), // 1 day ago
        addedBy: 'Sarah Johnson'
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 1.5), // 1.5 days ago
    createdBy: 'Chris Lee',
    closedAt: new Date(Date.now() - 86400000 * 0.2), // 0.2 days ago
    closedBy: 'Sarah Johnson'
  }
];

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const { toast } = useToast();

  const addNote = (ticketId: string, content: string) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticket.id === ticketId) {
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
        if (ticket.id === ticketId && !ticket.tags.includes(tag)) {
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
          return {
            ...ticket,
            tags: ticket.tags.filter(t => t !== tag)
          };
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
        if (ticket.id === ticketId && ticket.status === 'open') {
          return {
            ...ticket,
            status: 'closed',
            closedAt: new Date(),
            closedBy: currentUser
          };
        }
        return ticket;
      })
    );
    
    toast({
      title: "Ticket closed",
      description: "The ticket has been closed successfully.",
    });
  };

  const filterTicketsByTag = (tag: TicketTag | 'all') => {
    if (tag === 'all') {
      return tickets;
    }
    return tickets.filter(ticket => ticket.tags.includes(tag));
  };

  return {
    tickets,
    addNote,
    addTag,
    removeTag,
    closeTicket,
    filterTicketsByTag
  };
};
