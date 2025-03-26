
import { useState, useEffect } from 'react'
import { BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrderManagement } from '@/hooks/useOrderManagement'
import { Link } from 'react-router-dom'
import { Order } from '@/types/orderManagement'
import { useLanguageStore, translations } from '@/lib/i18n'

export function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  const { allOrders } = useOrderManagement()
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Filter orders with NPA or NPF status
  const criticalOrders = allOrders.filter(
    order => order.status === 'NPA' || order.status === 'NPF'
  )
  
  const hasNotifications = criticalOrders.length > 0
  
  // Close notifications panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as Element).closest('.notification-panel')) {
        setShowNotifications(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifications])
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="icon" 
        className="relative bg-background hover:bg-accent"
        onClick={() => setShowNotifications(!showNotifications)}
        title={t.notifications}
      >
        <BellRing className="h-5 w-5" />
        {hasNotifications && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            {criticalOrders.length}
          </span>
        )}
      </Button>
      
      {showNotifications && hasNotifications && (
        <div className="notification-panel absolute top-full right-0 mt-2 w-80 bg-background border rounded-md shadow-lg z-50">
          <div className="p-3 border-b font-medium">
            {t.criticalAlerts}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {criticalOrders.map((order) => (
              <div key={order.id} className="p-3 border-b hover:bg-muted/50">
                <Link 
                  to={`/employee/orders/${order.taskId}`} 
                  className="block"
                  onClick={() => setShowNotifications(false)}
                >
                  <p className="font-medium">{order.taskId}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.status === 'NPA' ? t.noProviderAccepted : t.noProviderFound}
                  </p>
                  <p className="text-sm">
                    {order.customerName} - {order.serviceType}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(order.pickupTime).toLocaleString()}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
