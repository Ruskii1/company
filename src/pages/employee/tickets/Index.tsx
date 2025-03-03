
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketCard } from '@/components/tickets/TicketCard';
import { useTickets } from '@/hooks/useTickets';
import { TicketTag } from '@/types/ticket';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TicketsPage = () => {
  const { tickets, addNote, addTag, removeTag, closeTicket, filterTicketsByTag } = useTickets();
  const [activeTag, setActiveTag] = useState<TicketTag | 'all'>('all');

  const availableTags: (TicketTag | 'all')[] = [
    'all',
    '#Providers', 
    '#Employees', 
    '#Finance', 
    '#Operations', 
    '#Corporates', 
    '#Suggestions', 
    '#Scedule', 
    '#IT', 
    '#SP Comapnies', 
    '#quality', 
    '#High Priority', 
    '#NULL'
  ];

  const getTagColor = (tag: string) => {
    if (tag === 'all') return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    
    const colors: Record<string, string> = {
      '#High Priority': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      '#IT': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      '#Finance': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      '#Operations': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      '#Employees': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      '#Providers': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      '#Corporates': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      '#Suggestions': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
      '#Scedule': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      '#SP Comapnies': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      '#quality': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
      '#NULL': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    
    return colors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const filteredTickets = filterTicketsByTag(activeTag);
  
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl font-bold dark:text-white">Tickets</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'} found
          </span>
        </CardTitle>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {availableTags.map((tag) => (
            <Badge 
              key={tag} 
              className={`
                cursor-pointer px-3 py-1 
                ${getTagColor(tag)}
                ${activeTag === tag ? 'ring-2 ring-offset-2 ring-primary' : ''}
              `}
              onClick={() => setActiveTag(tag)}
            >
              {tag === 'all' ? 'All Tickets' : tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="open" className="space-y-4">
          <TabsList>
            <TabsTrigger value="open">Open Tickets</TabsTrigger>
            <TabsTrigger value="closed">Closed Tickets</TabsTrigger>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="open" className="space-y-4">
            {filteredTickets.filter(ticket => ticket.status === 'open').length === 0 ? (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">No open tickets found</p>
            ) : (
              filteredTickets
                .filter(ticket => ticket.status === 'open')
                .map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onAddNote={addNote}
                    onAddTag={addTag}
                    onRemoveTag={removeTag}
                    onCloseTicket={closeTicket}
                  />
                ))
            )}
          </TabsContent>
          
          <TabsContent value="closed" className="space-y-4">
            {filteredTickets.filter(ticket => ticket.status === 'closed').length === 0 ? (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">No closed tickets found</p>
            ) : (
              filteredTickets
                .filter(ticket => ticket.status === 'closed')
                .map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onAddNote={addNote}
                    onAddTag={addTag}
                    onRemoveTag={removeTag}
                    onCloseTicket={closeTicket}
                  />
                ))
            )}
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            {filteredTickets.length === 0 ? (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">No tickets found</p>
            ) : (
              filteredTickets.map(ticket => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onAddNote={addNote}
                  onAddTag={addTag}
                  onRemoveTag={removeTag}
                  onCloseTicket={closeTicket}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TicketsPage;
