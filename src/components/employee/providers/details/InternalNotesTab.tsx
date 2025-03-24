
import React, { useState } from 'react';
import { ServiceProvider, InternalNote } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface InternalNotesTabProps {
  provider: ServiceProvider;
  onAddNote: (providerId: string, note: InternalNote) => void;
}

export function InternalNotesTab({ provider, onAddNote }: InternalNotesTabProps) {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: InternalNote = {
        id: `note-${Date.now()}`,
        text: newNote,
        createdAt: new Date().toISOString(),
        createdBy: {
          id: 'emp-001',
          name: 'Fatima Al-Sulaiman',
          role: 'Provider Manager'
        }
      };
      
      onAddNote(provider.id, note);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Internal Notes</CardTitle>
          <CardDescription>Internal notes about this provider</CardDescription>
        </div>
        <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Internal Note</DialogTitle>
              <DialogDescription>
                Add a new internal note about this provider. Only visible to employees.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                  placeholder="Enter your note here..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingNote(false)}>Cancel</Button>
              <Button onClick={handleAddNote}>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {provider.internalNotes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No internal notes found</p>
        ) : (
          <div className="space-y-4">
            {provider.internalNotes.map((note) => (
              <div key={note.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{note.createdBy.name} <span className="text-muted-foreground">({note.createdBy.role})</span></div>
                  <div className="text-sm text-muted-foreground">{new Date(note.createdAt).toLocaleString()}</div>
                </div>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
