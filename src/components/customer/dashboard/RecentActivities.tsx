import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Activity, Ticket, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// Mock request data
interface Request {
  id: string;
  taskId: string;
  serviceType: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
}

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
  
  // Mock requests data with standardized task IDs
  const requests: Request[] = [
    {
      id: "req-001",
      taskId: "2025-001",
      serviceType: "Regular Towing",
      pickupTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      pickupLocation: "123 Main St, Riyadh",
      dropoffLocation: "456 Market Ave, Riyadh",
      status: "Completed"
    },
    {
      id: "req-002",
      taskId: "2025-002",
      serviceType: "Battery Jumpstart",
      pickupTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      pickupLocation: "789 Business Blvd, Jeddah",
      dropoffLocation: "321 Commerce St, Jeddah",
      status: "Completed"
    },
    {
      id: "req-003",
      taskId: "2025-003",
      serviceType: "Tire Change",
      pickupTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // In 1 hour
      pickupLocation: "555 Park Dr, Dammam",
      dropoffLocation: "777 Garden Rd, Dammam",
      status: "Scheduled"
    }
  ];
  
  // Mock tickets data
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
          <Clock className="mr-2 h-5 w-5" />
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
                    <Ticket className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      {activity.type === 'request' ? (
                        <Link 
                          to={`/order-details/${activity.data.taskId}`}
                          className="font-medium hover:underline"
                        >
                          {activity.data.serviceType}
                        </Link>
                      ) : (
                        <Link 
                          to={`/tickets/${activity.data.id}`}
                          className="font-medium hover:underline"
                        >
                          {activity.data.title}
                        </Link>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'request' 
                          ? `${activity.data.pickupLocation} → ${activity.data.dropoffLocation}`
                          : t.status + ': ' + activity.data.status
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
