
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
  
  // Dummy critical notifications data (more comprehensive)
  const dummyCriticalNotifications = [
    {
      id: "notif-001",
      taskId: "TASK-4523",
      customerName: "Saudi Telecom Company",
      status: "NPA",
      serviceType: "Flatbed Towing",
      pickupTime: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 min ago
      city: "Riyadh"
    },
    {
      id: "notif-002",
      taskId: "TASK-4589",
      customerName: "Aramco",
      status: "NPF", 
      serviceType: "Battery Jumpstart",
      pickupTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
      city: "Dammam"
    },
    {
      id: "notif-003",
      taskId: "TASK-4602",
      customerName: "SABIC",
      status: "NPA",
      serviceType: "Fuel Delivery",
      pickupTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 60 min ago
      city: "Jubail"
    },
    {
      id: "notif-004",
      taskId: "TASK-4617",
      customerName: "Al Rajhi Bank",
      status: "NPF",
      serviceType: "Tire Change",
      pickupTime: new Date(Date.now() - 75 * 60 * 1000).toISOString(), // 75 min ago
      city: "Jeddah"
    },
    {
      id: "notif-005",
      taskId: "TASK-4625",
      customerName: "Saudi Airlines",
      status: "NPA",
      serviceType: "Key Lockout",
      pickupTime: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 90 min ago
      city: "Medina"
    }
  ];
  
  // Merge real critical orders with dummy notifications for demonstration
  const criticalOrders = [
    ...dummyCriticalNotifications,
    ...allOrders.filter(order => order.status === 'NPA' || order.status === 'NPF')
  ]
  
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
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
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
                  <p className="text-xs mt-1">
                    {order.city || ""}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
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
