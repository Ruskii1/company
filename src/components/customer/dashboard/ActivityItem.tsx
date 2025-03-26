
import { format } from "date-fns";
import { Activity, Calendar, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

interface ActivityItemProps {
  type: 'request' | 'ticket';
  title: string;
  subtitle: string;
  date: string;
  linkTo: string;
}

export function ActivityItem({ type, title, subtitle, date, linkTo }: ActivityItemProps) {
  return (
    <div className="flex space-x-4 items-start border-b pb-4 last:border-0">
      <div className="rounded-full p-2 bg-muted flex items-center justify-center">
        {type === 'request' ? (
          <Calendar className="h-4 w-4" />
        ) : (
          <Ticket className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <Link 
              to={linkTo}
              className="font-medium hover:underline"
            >
              {title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(date), 'MMM d')}
          </div>
        </div>
      </div>
    </div>
  );
}
