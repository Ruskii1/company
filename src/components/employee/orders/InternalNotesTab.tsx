
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { InternalNote } from "@/hooks/useOrderDetailsEmployee"
import { useState } from "react"

interface InternalNotesTabProps {
  notes: InternalNote[]
  onSaveNote: (note: string) => void
}

export const InternalNotesTab = ({ notes, onSaveNote }: InternalNotesTabProps) => {
  const [newInternalNote, setNewInternalNote] = useState('')

  const handleSaveInternalNote = () => {
    if (!newInternalNote.trim()) return;
    onSaveNote(newInternalNote);
    setNewInternalNote('');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Internal Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {notes.map((note) => (
            <div 
              key={note.id}
              className="p-3 rounded-lg border-l-4 border-primary bg-muted"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm">
                  {note.employeeName}
                </span>
                <span className="text-xs text-gray-500">{note.timestamp}</span>
              </div>
              <p className="text-sm">{note.message}</p>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <Textarea
            placeholder="Add internal notes about this order (not visible to customer)..."
            className="min-h-[100px]"
            value={newInternalNote}
            onChange={(e) => setNewInternalNote(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSaveInternalNote} disabled={!newInternalNote.trim()}>
              Save Note
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
