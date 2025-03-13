
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Note } from "@/hooks/useOrderDetailsEmployee"
import { useState } from "react"

interface ConversationTabProps {
  conversation: Note[]
  onSendNote: (note: string) => void
}

export const ConversationTab = ({ conversation, onSendNote }: ConversationTabProps) => {
  const [newNote, setNewNote] = useState('')

  const handleSendNote = () => {
    if (!newNote.trim()) return;
    onSendNote(newNote);
    setNewNote('');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Conversation History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {conversation.map((note) => (
            <div 
              key={note.id}
              className={`p-3 rounded-lg ${
                note.sender === 'customer' 
                  ? 'bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 ml-auto mr-0' 
                  : 'bg-green-50 dark:bg-green-950 border-l-4 border-green-500 mr-auto ml-0'
              } max-w-[80%]`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm">
                  {note.senderName} 
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    ({note.sender})
                  </span>
                </span>
                <span className="text-xs text-gray-500">{note.timestamp}</span>
              </div>
              <p className="text-sm">{note.message}</p>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note to this conversation..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleSendNote} disabled={!newNote.trim()}>
              Send Note
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
