
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Note } from "@/types/order"
import { useState } from "react"
import { useLanguageStore, translations } from "@/lib/i18n"

interface ExternalNotesTabProps {
  notes: Note[]
  onSendNote: (message: string) => void
  canEditNotes: boolean
}

export const ExternalNotesTab = ({ notes, onSendNote, canEditNotes = true }: ExternalNotesTabProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [newNote, setNewNote] = useState("")
  
  const handleSendNote = () => {
    if (!newNote.trim()) return
    
    onSendNote(newNote)
    setNewNote("")
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          External Notes (Visible to Customer)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div 
                key={note.id}
                className={`p-3 rounded-lg ${
                  note.sender === 'employee' 
                    ? 'bg-primary text-primary-foreground ml-12' 
                    : 'border bg-muted mr-12'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">
                    {note.sender === 'employee' ? 'Support Team' : note.senderName}
                  </span>
                  <span className="text-xs opacity-75">{note.timestamp}</span>
                </div>
                <p className="text-sm">{note.message}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No external notes available.
            </p>
          )}
        </div>
        
        {canEditNotes && (
          <div className="space-y-2">
            <Textarea
              placeholder="Add note visible to customer..."
              className="min-h-[100px]"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleSendNote} disabled={!newNote.trim()}>
                Send Note
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
