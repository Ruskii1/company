
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Home } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Link } from "react-router-dom";

export function CustomerTopBar() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Dummy notification data
  const notifications = [
    {
      id: "req-001",
      serviceType: "Regular Towing",
      status: "Waiting for Provider",
      pickupTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      isWaitingForProvider: true,
      isSoon: false
    },
    {
      id: "req-003",
      serviceType: "Tire Change",
      status: "Scheduled",
      pickupTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      isWaitingForProvider: false,
      isSoon: true
    },
    {
      id: "req-004",
      serviceType: "Fuel Delivery",
      status: "Waiting for Provider",
      pickupTime: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
      isWaitingForProvider: true,
      isSoon: false
    }
  ];
  
  const hasNotifications = notifications.length > 0;
  
  return (
    <div className={`fixed ${language === 'ar' ? 'left-4' : 'right-4'} top-4 z-50 flex items-center gap-4 dir-ltr`}>
      <Button
        variant="outline"
        size="icon"
        className="relative bg-background hover:bg-accent"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5" />
        {hasNotifications && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            {notifications.length}
          </span>
        )}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        asChild
        className="bg-background hover:bg-accent"
        title="Go to Home"
      >
        <Link to="/">
          <Home className="h-5 w-5" />
        </Link>
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        className="bg-background hover:bg-accent"
      >
        <SidebarTrigger className="h-5 w-5" />
      </Button>
      
      {/* Notification dropdown panel */}
      {showNotifications && hasNotifications && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-background border rounded-md shadow-lg z-50">
          <div className="p-3 border-b font-medium">
            {t.notifications}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((request) => (
              <div key={request.id} className="p-3 border-b hover:bg-muted/50">
                <Link 
                  to={`/order-details/${request.id}`} 
                  className="block"
                  onClick={() => setShowNotifications(false)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{request.serviceType}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.isWaitingForProvider ? t.waitingForProvider : t.upcomingRequest}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(request.pickupTime).toLocaleString()}
                      </p>
                    </div>
                    {request.isWaitingForProvider ? (
                      <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">
                        {t.attention}
                      </span>
                    ) : request.isSoon ? (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {t.soon}
                      </span>
                    ) : null}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
