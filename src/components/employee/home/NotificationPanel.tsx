
import { Order } from '@/types/orderManagement'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

interface NotificationPanelProps {
  notifications: Order[]
  onClose: () => void
}

export function NotificationPanel({ notifications, onClose }: NotificationPanelProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
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
