
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { EmployeeStatCard } from '@/components/employee/home/EmployeeStatCard'
import { RecentActivityList } from '@/components/employee/home/RecentActivityList'
import { NotificationPanel } from '@/components/employee/home/NotificationPanel'

const EmployeeHomePage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Dummy data for statistics
  const totalRequests = 42
  const openTickets = 7
  const closedTickets = 35
  
  // Dummy data for today's orders
  const todayOrders = [
    {
      id: "ord-001",
      customerName: "TechCorp LLC",
      serviceType: "Regular Towing",
      pickupTime: new Date().setHours(10, 30),
      status: "In route"
    },
    {
      id: "ord-002",
      customerName: "GlobalTrade Inc.",
      serviceType: "Battery Jumpstart",
      pickupTime: new Date().setHours(13, 15),
      status: "Waiting for provider"
    },
    {
      id: "ord-003",
      customerName: "SmartSolutions SA",
      serviceType: "Fuel Delivery",
      pickupTime: new Date().setHours(15, 0),
      status: "Completed"
    },
    {
      id: "ord-004",
      customerName: "InnovateX Ltd",
      serviceType: "Tire Change",
      pickupTime: new Date().setHours(16, 45),
      status: "Waiting for provider"
    }
  ]
  
  // Dummy data for provider issues
  const providerIssues = todayOrders.filter(order => order.status === 'Waiting for provider')
  
  const hasNotifications = providerIssues.length > 0
  
  // Dummy data for recent activities
  const recentActivities = [
    {
      id: "act-001",
      type: "request_created",
      description: "New request created by TechCorp LLC",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      relatedId: "TASK-1001"
    },
    {
      id: "act-002",
      type: "provider_assigned",
      description: "Provider assigned to GlobalTrade Inc. request",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
      relatedId: "TASK-1002"
    },
    {
      id: "act-003",
      type: "request_completed",
      description: "Request for SmartSolutions SA marked as completed",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      relatedId: "TASK-1003"
    },
    {
      id: "act-004",
      type: "ticket_created",
      description: "New support ticket opened by InnovateX Ltd",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      relatedId: "TICKET-001"
    },
    {
      id: "act-005",
      type: "ticket_resolved",
      description: "Support ticket for QualityServices LLC resolved",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      relatedId: "TICKET-002"
    }
  ]
  
  return (
    <>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">{t.home}</h1>
        
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
                {providerIssues.length}
              </span>
            )}
          </Button>
          
          {showNotifications && hasNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <EmployeeStatCard 
          title={t.totalRequests}
          value={totalRequests}
          icon="Calendar"
          description={t.pastTodayFutureRequests}
        />
        
        <EmployeeStatCard 
          title={t.openTickets}
          value={openTickets}
          icon="Ticket"
          description={t.ticketsNeedingAttention}
        />
        
        <EmployeeStatCard 
          title={t.closedTickets}
          value={closedTickets}
          icon="Check"
          description={t.resolvedTickets}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
          <CardHeader>
            <CardTitle>{t.recentActivity}</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList activities={recentActivities} />
            
            {recentActivities.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                {t.noRecentActivity}
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.todaysRequests}</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/employee">{t.viewAll}</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {todayOrders.length > 0 ? (
              <div className="space-y-4">
                {todayOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.serviceType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{new Date(order.pickupTime).toLocaleTimeString()}</p>
                      <p className="text-sm font-medium">
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
                
                {todayOrders.length > 3 && (
                  <p className="text-sm text-center text-muted-foreground">
                    {t.andMore} {todayOrders.length - 3} {t.requests}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                {t.noTodayRequests}
              </p>
            )}
          </CardContent>
        </Card>
        
        {providerIssues.length > 0 && (
          <Card className="col-span-1 lg:col-span-2 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
            <CardHeader>
              <CardTitle>{t.attentionRequired}</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTitle>{t.providerIssues}</AlertTitle>
                <AlertDescription>
                  {t.thereAre} {providerIssues.length} {t.requestsWithoutProvider}
                </AlertDescription>
              </Alert>
              
              <div className="mt-4">
                <Button asChild>
                  <Link to="/employee">{t.reviewRequests}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

export default EmployeeHomePage
