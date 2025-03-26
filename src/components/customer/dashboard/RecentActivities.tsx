
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Clock } from "lucide-react";
import { ActivityItem } from "./ActivityItem";
import { getRecentActivities } from "@/utils/activityUtils";

export function RecentActivities() {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  // Get recent activities (top 5)
  const activities = getRecentActivities(5);
  
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
            activities.map((activity, index) => {
              if (activity.type === 'request') {
                const request = activity.data;
                return (
                  <ActivityItem
                    key={`request-${index}`}
                    type="request"
                    title={request.serviceType}
                    subtitle={`${request.pickupLocation} → ${request.dropoffLocation}`}
                    date={request.pickupTime}
                    linkTo={`/order-details/${request.taskId}`}
                  />
                );
              } else {
                const ticket = activity.data;
                return (
                  <ActivityItem
                    key={`ticket-${index}`}
                    type="ticket"
                    title={ticket.title}
                    subtitle={`${t.status}: ${ticket.status}`}
                    date={ticket.createdAt.toISOString()}
                    linkTo={`/tickets/${ticket.id}`}
                  />
                );
              }
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">{t.noRecentActivities}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
