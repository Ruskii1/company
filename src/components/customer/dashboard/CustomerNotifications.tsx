
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Bell, Clock, AlertTriangle } from "lucide-react";
import { useRequestsData } from "@/hooks/useRequestsData";
import { Request } from "@/types/request";
import { Link } from "react-router-dom";

export function CustomerNotifications() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const { todayRequests, futureRequests } = useRequestsData();
  const [notifications, setNotifications] = useState<{
    needsUpdating: Request[];
    upcoming: Request[];
  }>({
    needsUpdating: [],
    upcoming: []
  });
  
  // Find requests that need updating (those in 'Waiting for Provider' state)
  useEffect(() => {
    const needsUpdating = [...todayRequests, ...futureRequests].filter(
      request => request.status === 'Waiting for Provider'
    );
    
    // Find requests that are upcoming (scheduled to start within the next 2 hours)
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    const upcoming = futureRequests.filter(request => {
      const pickupTime = new Date(request.pickupTime);
      return pickupTime > now && pickupTime < twoHoursFromNow;
    });
    
    setNotifications({
      needsUpdating,
      upcoming
    });
  }, [todayRequests, futureRequests]);
  
  // If there are no notifications, don't render the component
  if (notifications.needsUpdating.length === 0 && notifications.upcoming.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          {t.notifications}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.needsUpdating.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t.requestsNeedAttention}</AlertTitle>
            <AlertDescription>
              {t.youHave} {notifications.needsUpdating.length} {t.requestsNeedingUpdate}
              <Link to="/customer/requests" className="block mt-2 text-sm underline">
                {t.viewRequests}
              </Link>
            </AlertDescription>
          </Alert>
        )}
        
        {notifications.upcoming.length > 0 && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>{t.upcomingRequests}</AlertTitle>
            <AlertDescription>
              {t.youHave} {notifications.upcoming.length} {t.requestsInNextTwoHours}
              <div className="mt-2 space-y-1">
                {notifications.upcoming.map(request => (
                  <Link 
                    key={request.id} 
                    to={`/customer/requests/${request.id}`}
                    className="block text-sm hover:underline"
                  >
                    {new Date(request.pickupTime).toLocaleTimeString()} - {request.serviceType}
                  </Link>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
