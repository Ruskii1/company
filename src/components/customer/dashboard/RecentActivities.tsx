
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Activity, TicketSquare, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Request } from "@/types/request";
import { useRequestsData } from "@/hooks/useRequestsData";
import { Link } from "react-router-dom";

// Mock ticket data structure
interface Ticket {
  id: string;
  title: string;
  createdAt: string;
  status: string;
}

// Combined activity type
type CustomerActivity = 
  | { type: 'request'; data: Request }
  | { type: 'ticket'; data: Ticket };

export function RecentActivities() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const { requests } = useRequestsData();
  
  // Mock tickets data (in a real app, this would come from an API)
  const mockTickets: Ticket[] = [
    {
      id: 'T001',
      title: 'Driver was late',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
      status: 'Open'
    },
    {
      id: 'T002',
      title: 'Question about billing',
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
      status: 'Closed'
    }
  ];
  
  // Combine and sort activities
  const activities: CustomerActivity[] = [
    ...requests.map(request => ({ type: 'request' as const, data: request })),
    ...mockTickets.map(ticket => ({ type: 'ticket' as const, data: ticket }))
  ].sort((a, b) => {
    const dateA = new Date(a.type === 'request' ? a.data.pickupTime : a.data.createdAt);
    const dateB = new Date(b.type === 'request' ? b.data.pickupTime : b.data.createdAt);
    return dateB.getTime() - dateA.getTime(); // Sort by most recent first
  }).slice(0, 5); // Take only the 5 most recent activities
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          {t.recentActivities}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="flex space-x-4 items-start border-b pb-4 last:border-0">
                <div className="rounded-full p-2 bg-muted flex items-center justify-center">
                  {activity.type === 'request' ? (
                    <Calendar className="h-4 w-4" />
                  ) : (
                    <TicketSquare className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      {activity.type === 'request' ? (
                        <Link 
                          to={`/customer/requests/${activity.data.id}`}
                          className="font-medium hover:underline"
                        >
                          {activity.data.serviceType}
                        </Link>
                      ) : (
                        <Link 
                          to={`/customer/tickets/${activity.data.id}`}
                          className="font-medium hover:underline"
                        >
                          {activity.data.title}
                        </Link>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'request' 
                          ? `${activity.data.pickupLocation} → ${activity.data.dropoffLocation}`
                          : t.ticketStatus + ': ' + activity.data.status
                        }
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(
                        new Date(activity.type === 'request' 
                          ? activity.data.pickupTime 
                          : activity.data.createdAt
                        ),
                        'MMM d'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">{t.noRecentActivities}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
