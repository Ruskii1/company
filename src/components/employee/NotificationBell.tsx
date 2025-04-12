
import { useState, useEffect } from 'react'
import { BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrderManagement } from '@/hooks/useOrderManagement'
import { Link } from 'react-router-dom'
import { Order } from '@/types/orderManagement'
import { useLanguageStore, translations } from '@/lib/i18n'
import { OrderStatus } from '@/types/orderStatus'

// Notification types interface 
interface Notification {
  id: string
  taskId: string
  customerName: string
  status: string
  serviceType: string
  pickupTime: string
  city?: string
  type: 'critical' | 'provider' | 'general'
}

export function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  const { allOrders } = useOrderManagement()
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Comprehensive notifications data
  const dummyCriticalNotifications: Notification[] = [
    {
      id: "notif-001",
      taskId: "TASK-4523",
      customerName: "Saudi Telecom Company",
      status: "NPA",
      serviceType: "Flatbed Towing",
      pickupTime: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 min ago
      city: "Riyadh",
      type: 'critical'
    },
    {
      id: "notif-002",
      taskId: "TASK-4589",
      customerName: "Aramco",
      status: "NPF", 
      serviceType: "Battery Jumpstart",
      pickupTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
      city: "Dammam",
      type: 'critical'
    }
  ]

  // Provider issue notifications (from home page)
  const dummyProviderNotifications: Notification[] = [
    {
      id: "prov-001",
      taskId: "TASK-2001",
      customerName: "TechCorp LLC",
      status: "Waiting for Provider",  // Fixed: changed from "Waiting for provider"
      serviceType: "Regular Towing",
      pickupTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: 'provider'
    },
    {
      id: "prov-002",
      taskId: "TASK-2002",
      customerName: "GlobalTrade Inc.",
      status: "Waiting for Provider",  // Fixed: changed from "Waiting for provider"
      serviceType: "Battery Jumpstart",
      pickupTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      type: 'provider'
    }
  ]
  
  // Combine all notifications
  const allNotifications = [
    ...dummyCriticalNotifications,
    ...dummyProviderNotifications,
    ...allOrders
      .filter(order => order.status === 'NPA' || order.status === 'NPF')
      .map(order => ({
        id: order.id,
        taskId: order.taskId || order.id,
        customerName: order.customerName || '',
        status: order.status,
        serviceType: order.serviceType || '',
        pickupTime: order.pickupTime || new Date().toISOString(),
        city: order.city || '',
        type: 'critical' as const
      }))
  ]
  
  const hasNotifications = allNotifications.length > 0
  
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
  
  // Get notification badge color based on type
  const getNotificationBadge = (type: string) => {
    switch(type) {
      case 'NPA':
        return <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">{t.noProviderAccepted}</span>
      case 'NPF':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">{t.noProviderFound}</span>
      case 'Waiting for provider':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{t.waitingForProvider}</span>
      default:
        return null
    }
  }
  
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
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            {allNotifications.length}
          </span>
        )}
      </Button>
      
      {showNotifications && hasNotifications && (
        <div className="notification-panel absolute top-full right-0 mt-2 w-80 bg-background border rounded-md shadow-lg z-50">
          <div className="p-3 border-b font-medium">
            {t.notifications}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {allNotifications.map((notification) => (
              <div key={notification.id} className="p-3 border-b hover:bg-muted/50">
                <Link 
                  to={`/employee/orders/${notification.taskId}`} 
                  className="block"
                  onClick={() => setShowNotifications(false)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{notification.taskId}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.status === 'NPA' ? t.noProviderAccepted : 
                         notification.status === 'NPF' ? t.noProviderFound : 
                         notification.status}
                      </p>
                      <p className="text-sm">
                        {notification.customerName} - {notification.serviceType}
                      </p>
                      {notification.city && (
                        <p className="text-xs mt-1">
                          {notification.city}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(notification.pickupTime).toLocaleString()}
                      </p>
                    </div>
                    {getNotificationBadge(notification.status)}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
