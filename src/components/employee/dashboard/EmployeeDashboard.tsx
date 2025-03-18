
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguageStore, translations } from '@/lib/i18n'
import { 
  Activity, 
  AlertTriangle, 
  Bell, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText,
  Ticket 
} from "lucide-react"
import { useOrderManagement } from '@/hooks/useOrderManagement'
import { useTickets } from '@/hooks/useTickets'
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

// Types for recent actions
interface RecentAction {
  id: string
  actionType: string
  description: string
  timestamp: string
}

export function EmployeeDashboard() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()
  const { allOrders } = useOrderManagement()
  const { tickets } = useTickets()
  
  // Count orders by status
  const scheduledOrders = allOrders.filter(order => 
    ['Pending', 'Waiting for provider'].includes(order.status)
  ).length
  
  const ongoingOrders = allOrders.filter(order => 
    ['In route', 'Arrived at the pick-up location', 'In service'].includes(order.status)
  ).length
  
  const completedOrders = allOrders.filter(order => 
    ['Completed'].includes(order.status)
  ).length
  
  // Count tickets
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length
  const closedTickets = tickets.filter(ticket => ticket.status === 'closed').length
  
  // Sample notifications
  const notifications = [
    {
      id: '1',
      type: 'warning',
      message: 'No provider found for order #2025-009',
      timestamp: '10 minutes ago'
    },
    {
      id: '2',
      type: 'info',
      message: 'New ticket created by TechWave Solutions',
      timestamp: '25 minutes ago'
    },
    {
      id: '3',
      type: 'warning',
      message: 'Order #2025-007 is delayed',
      timestamp: '1 hour ago'
    }
  ]
  
  // Sample recent actions
  const recentActions: RecentAction[] = [
    {
      id: '1',
      actionType: 'status_update',
      description: 'Updated order #2025-002 status to "In service"',
      timestamp: '15 minutes ago'
    },
    {
      id: '2',
      actionType: 'note_added',
      description: 'Added note to order #2025-001',
      timestamp: '45 minutes ago'
    },
    {
      id: '3',
      actionType: 'ticket_closed',
      description: 'Closed ticket #3 - Driver Scheduling Conflict',
      timestamp: '1 hour ago'
    },
    {
      id: '4',
      actionType: 'provider_assigned',
      description: 'Assigned provider to order #2025-006',
      timestamp: '2 hours ago'
    },
    {
      id: '5',
      actionType: 'order_created',
      description: 'Created new order #2025-009 for Healthcare Partners',
      timestamp: '3 hours ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-amber-500" />
              {t.scheduledOrders}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{scheduledOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.ordersWaitingForService}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 text-xs" 
              onClick={() => navigate('/employee/requests')}
            >
              {t.viewAll}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              {t.ongoingOrders}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{ongoingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.ordersInProgress}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 text-xs" 
              onClick={() => navigate('/employee/requests')}
            >
              {t.viewAll}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              {t.completedOrders}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.ordersCompleted}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 text-xs" 
              onClick={() => navigate('/employee/requests')}
            >
              {t.viewAll}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Tickets Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Ticket className="h-4 w-4 mr-2 text-primary" />
              {t.ticketsSummary}
            </CardTitle>
            <CardDescription>
              {t.openAndClosedTickets}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{openTickets}</div>
                <p className="text-xs text-muted-foreground">
                  {t.openTickets}
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold">{closedTickets}</div>
                <p className="text-xs text-muted-foreground">
                  {t.closedTickets}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/employee/tickets')}
              >
                {t.manageTickets}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Bell className="h-4 w-4 mr-2 text-primary" />
              {t.notifications}
            </CardTitle>
            <CardDescription>
              {t.recentSystemNotifications}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-start gap-2">
                  {notification.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                  ) : (
                    <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Activity className="h-4 w-4 mr-2 text-primary" />
            {t.recentActions}
          </CardTitle>
          <CardDescription>
            {t.mostRecentActionsBy}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActions.map(action => (
              <div key={action.id} className="flex items-start gap-2 pb-3 border-b last:border-0">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">{action.description}</p>
                  <p className="text-xs text-muted-foreground">{action.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
