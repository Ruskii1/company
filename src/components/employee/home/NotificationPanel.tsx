
import { useLanguageStore, translations } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

// Using a simpler interface for notifications
interface Notification {
  id: string
  taskId: string
  customerName: string
  pickupTime: string
  serviceType: string
}

interface NotificationPanelProps {
  onClose: () => void
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Dummy notification data
  const notifications: Notification[] = [
    {
      id: "not-001",
      taskId: "TASK-2001",
      customerName: "TechCorp LLC",
      pickupTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      serviceType: "Regular Towing"
    },
    {
      id: "not-002",
      taskId: "TASK-2002",
      customerName: "GlobalTrade Inc.",
      pickupTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      serviceType: "Battery Jumpstart"
    },
    {
      id: "not-003",
      taskId: "TASK-2003",
      customerName: "SmartSolutions SA",
      pickupTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      serviceType: "Fuel Delivery"
    }
  ];
  
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-background border rounded-md shadow-lg z-50">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-medium">{t.notifications}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-3 border-b hover:bg-muted/50">
            <Link to={`/employee/orders/${notification.taskId}`} className="block">
              <p className="font-medium">{notification.taskId}</p>
              <p className="text-sm text-muted-foreground">
                {t.waitingForProvider}: {notification.customerName}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(notification.pickupTime).toLocaleString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
