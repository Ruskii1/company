
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Note {
  id: string
  sender: 'customer' | 'employee'
  message: string
  timestamp: string
  senderName: string
}

interface ConversationComponentProps {
  conversation: Note[]
  onSendNote: (note: string) => void
}

export const ConversationComponent = ({ 
  conversation, 
  onSendNote 
}: ConversationComponentProps) => {
  const [newNote, setNewNote] = useState('')
  const { toast } = useToast()

  const handleSendNote = () => {
    if (!newNote.trim()) return
    
    onSendNote(newNote.trim())
    setNewNote('')
    
    toast({
      title: "Note sent",
      description: "Your message has been added to the conversation",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Conversation
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
                <span className="font-semibold text-sm">{note.senderName}</span>
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
              Send Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
