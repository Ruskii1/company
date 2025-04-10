
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { formatDateTime, getTimeAgo } from '@/utils/formatters'

export interface Note {
  id: string
  sender: 'customer' | 'employee' | 'system' | 'provider'
  message: string
  timestamp: string
}

interface ConversationTabProps {
  conversation?: Note[]
  onSendNote: (message: string) => void
}

export const ConversationTab = ({ conversation = [], onSendNote }: ConversationTabProps) => {
  const [newNote, setNewNote] = useState('')

  const handleSendNote = () => {
    if (newNote.trim()) {
      onSendNote(newNote.trim())
      setNewNote('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendNote()
    }
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 h-[400px] overflow-y-auto space-y-4">
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No messages yet
          </div>
        ) : (
          conversation.map((note) => (
            <div key={note.id} className={`flex flex-col ${note.sender === 'customer' ? 'items-end' : 'items-start'}`}>
              <div 
                className={`rounded-lg p-3 max-w-[80%] ${
                  note.sender === 'customer' 
                    ? 'bg-primary text-primary-foreground'
                    : note.sender === 'system'
                      ? 'bg-muted text-muted-foreground italic'
                      : 'bg-secondary'
                }`}
              >
                <p>{note.message}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {note.sender === 'system' ? 'System' : 
                 note.sender === 'provider' ? 'Provider' : 
                 note.sender === 'customer' ? 'You' : 'Employee'} 
                &nbsp;•&nbsp;
                {getTimeAgo(note.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <Textarea 
          placeholder="Type your message here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none"
        />
        <Button 
          onClick={handleSendNote}
          disabled={!newNote.trim()}
          className="flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
