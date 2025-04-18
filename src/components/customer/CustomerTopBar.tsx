
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Home } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

export function CustomerTopBar() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [showNotifications, setShowNotifications] = useState(false);
  
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
    <>
      <div className="md:hidden absolute top-3 left-4">
        <Logo size="small" />
      </div>
      
      <div className={`fixed ${language === 'ar' ? 'left-4' : 'right-4'} top-4 z-50 flex items-center gap-4 dir-ltr`}>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-background hover:bg-accent dark:text-white flex items-center justify-center"
          onClick={() => setShowNotifications(!showNotifications)}
          title={t.notifications}
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
              {notifications.length}
            </span>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          asChild
          className="bg-background hover:bg-accent dark:text-white flex items-center justify-center"
          title="Go to Employee Portal"
        >
          <Link to="/employee">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon"
          className="bg-background hover:bg-accent dark:text-white flex items-center justify-center"
          title="Toggle Sidebar"
        >
          <SidebarTrigger className="h-5 w-5" />
        </Button>
        
        {showNotifications && hasNotifications && (
          <div className="absolute top-full mt-2 w-80 bg-background border rounded-md shadow-lg z-50" style={{ right: 0 }}>
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
                        <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100 rounded">
                          {t.attention}
                        </span>
                      ) : request.isSoon ? (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded">
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
    </>
  );
}
