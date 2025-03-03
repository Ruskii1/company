
import { useState } from 'react';
import { Ticket, TicketTag } from '@/types/ticket';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';
import { PlusCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TicketNotesProps {
  ticket: Ticket;
  onAddNote: (ticketId: string, note: string) => void;
  onAddTag: (ticketId: string, tag: TicketTag) => void;
  onRemoveTag: (ticketId: string, tag: TicketTag) => void;
}

export const TicketNotes = ({ 
  ticket, 
  onAddNote, 
  onAddTag, 
  onRemoveTag 
}: TicketNotesProps) => {
  const [newNote, setNewNote] = useState('');
  const [selectedTag, setSelectedTag] = useState<TicketTag | ''>('');
  
  const availableTags: TicketTag[] = [
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
  
  const unusedTags = availableTags.filter(tag => !ticket.tags.includes(tag));

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(ticket.id, newNote);
      setNewNote('');
    }
  };

  const handleAddTag = () => {
    if (selectedTag && !ticket.tags.includes(selectedTag as TicketTag)) {
      onAddTag(ticket.id, selectedTag as TicketTag);
      setSelectedTag('');
    }
  };

  const getTagColor = (tag: string) => {
    // Same implementation as in TicketCard
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

  return (
    <div className="space-y-4 pt-4 border-t dark:border-gray-700">
      <div>
        <h3 className="text-md font-medium mb-2 dark:text-gray-200">Tags</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {ticket.tags.map((tag, index) => (
            <Badge key={index} className={`${getTagColor(tag)} flex items-center gap-1`}>
              {tag}
              <button 
                onClick={() => onRemoveTag(ticket.id, tag)}
                className="ml-1 hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2 mb-6">
          <Select 
            value={selectedTag} 
            onValueChange={(value) => setSelectedTag(value as TicketTag)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tag to add" />
            </SelectTrigger>
            <SelectContent>
              {unusedTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            onClick={handleAddTag}
            disabled={!selectedTag}
            className="shrink-0"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Tag
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2 dark:text-gray-200">Notes</h3>
        <div className="space-y-3 mb-4">
          {ticket.notes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">No notes yet</p>
          ) : (
            ticket.notes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                <p className="text-gray-700 dark:text-gray-300 mb-1">{note.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Added by {note.createdBy} • {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </p>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-3 space-y-2">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button
            className="w-full"
            onClick={handleAddNote}
            disabled={!newNote.trim()}
          >
            Add Note
          </Button>
        </div>
      </div>
      
      {ticket.tagChanges.length > 0 && (
        <div>
          <h3 className="text-md font-medium mb-2 dark:text-gray-200">Tag History</h3>
          <div className="space-y-1">
            {ticket.tagChanges.map((change) => (
              <p key={change.id} className="text-xs text-gray-500 dark:text-gray-400">
                {change.addedBy} added {change.tag} • {formatDistanceToNow(new Date(change.addedAt), { addSuffix: true })}
              </p>
            ))}
          </div>
        </div>
      )}
      
      {ticket.closedBy && (
        <div className="pt-2 border-t dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Closed by {ticket.closedBy} • {formatDistanceToNow(new Date(ticket.closedAt!), { addSuffix: true })}
          </p>
        </div>
      )}
    </div>
  );
};
