
import { useState } from 'react';
import { Ticket, TicketTag } from '@/types/ticket';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TicketNotes } from './TicketNotes';
import { formatDistanceToNow } from 'date-fns';
import { PenLine, Tag, CheckCircle } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
  onAddNote: (ticketId: string, note: string) => void;
  onAddTag: (ticketId: string, tag: TicketTag) => void;
  onRemoveTag: (ticketId: string, tag: TicketTag) => void;
  onCloseTicket: (ticketId: string) => void;
}

export const TicketCard = ({ 
  ticket, 
  onAddNote, 
  onAddTag, 
  onRemoveTag, 
  onCloseTicket 
}: TicketCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    return status === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      '#Urgent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
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

  return (
    <Card className="mb-4 shadow-md border dark:border-gray-700 dark:bg-gray-800 transition-all duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold dark:text-white">{ticket.title}</CardTitle>
            <CardDescription className="mt-1 dark:text-gray-300">
              Created by {ticket.createdBy} • {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(ticket.status)}>
            {ticket.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{ticket.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {ticket.tags.map((tag, index) => (
              <Badge key={index} className={getTagColor(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
          
          {isExpanded && (
            <TicketNotes
              ticket={ticket}
              onAddNote={onAddNote}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="dark:border-gray-600 dark:text-gray-300"
          >
            <PenLine className="h-4 w-4 mr-1" />
            {isExpanded ? 'Hide Details' : 'View Details'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="dark:border-gray-600 dark:text-gray-300"
            onClick={() => setIsExpanded(true)}
          >
            <Tag className="h-4 w-4 mr-1" />
            Manage Tags
          </Button>
        </div>
        
        {ticket.status === 'open' && (
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
            onClick={() => onCloseTicket(ticket.id)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Close Ticket
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
