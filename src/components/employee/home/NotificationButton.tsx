
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { NotificationPanel } from '@/components/employee/home/NotificationPanel'

interface NotificationButtonProps {
  notificationCount: number
  hasNotifications: boolean
}

export function NotificationButton({ notificationCount, hasNotifications }: NotificationButtonProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="icon" 
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell />
        {hasNotifications && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            {notificationCount}
          </span>
        )}
      </Button>
      
      {showNotifications && hasNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </div>
  )
}
