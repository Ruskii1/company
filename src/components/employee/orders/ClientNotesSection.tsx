
import { StickyNote } from "lucide-react";

interface ClientNotesSectionProps {
  notes?: string;
}

export const ClientNotesSection = ({ notes }: ClientNotesSectionProps) => {
  if (!notes) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <StickyNote className="h-4 w-4" />
        Client Notes
      </h3>
      <div className="bg-muted p-3 rounded-md whitespace-pre-wrap">
        {notes}
      </div>
    </div>
  );
};
