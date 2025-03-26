
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Bell, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function CustomerNotifications() {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  // Dummy notifications data
  const notifications = {
    needsUpdating: [
      {
        id: "req-001",
        taskId: "TASK-1001",
        serviceType: "Regular Towing",
        status: "Waiting for Provider",
        pickupTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        pickupLocation: "123 Main St, Riyadh",
        dropoffLocation: "456 Market Ave, Riyadh"
      },
      {
        id: "req-002",
        taskId: "TASK-1002",
        serviceType: "Battery Jumpstart",
        status: "Waiting for Provider",
        pickupTime: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
        pickupLocation: "789 Business Blvd, Jeddah",
        dropoffLocation: "321 Commerce St, Jeddah"
      }
    ],
    upcoming: [
      {
        id: "req-003",
        taskId: "TASK-1003",
        serviceType: "Tire Change",
        status: "Scheduled",
        pickupTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        pickupLocation: "555 Park Dr, Dammam",
        dropoffLocation: "777 Garden Rd, Dammam"
      }
    ]
  };
  
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
            <AlertTitle className="font-medium">{t.requestsNeedAttention}</AlertTitle>
            <AlertDescription>
              {t.youHave} <span className="font-medium">{notifications.needsUpdating.length}</span> {t.requestsNeedingUpdate}
              <Link to="/requests?tab=today" className="block mt-2 text-sm underline">
                {t.viewRequests}
              </Link>
            </AlertDescription>
          </Alert>
        )}
        
        {notifications.upcoming.length > 0 && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle className="font-medium">{t.upcomingRequests}</AlertTitle>
            <AlertDescription>
              {t.youHave} <span className="font-medium">{notifications.upcoming.length}</span> {t.requestsInNextTwoHours}
              <div className="mt-2 space-y-1">
                {notifications.upcoming.map(request => (
                  <Link 
                    key={request.id} 
                    to={`/order-details/${request.taskId}`}
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
