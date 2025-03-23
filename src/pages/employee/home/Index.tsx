
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLanguageStore, translations } from '@/lib/i18n'
import { useOrderManagement } from '@/hooks/useOrderManagement'
import { useTickets } from '@/hooks/useTickets'
import { useRecentActivity } from '@/hooks/useRecentActivity'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { EmployeeStatCard } from '@/components/employee/home/EmployeeStatCard'
import { RecentActivityList } from '@/components/employee/home/RecentActivityList'
import { NotificationPanel } from '@/components/employee/home/NotificationPanel'

const EmployeeHomePage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { pastOrders, todayOrders, futureOrders } = useOrderManagement()
  const { tickets } = useTickets()
  const { recentActivities } = useRecentActivity()
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Calculate statistics
  const totalRequests = pastOrders.length + todayOrders.length + futureOrders.length
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length
  const closedTickets = tickets.filter(ticket => ticket.status === 'closed').length
  
  // Get provider-related issues
  const providerIssues = todayOrders.filter(
    order => order.status === 'Waiting for provider' && 
    new Date(order.pickupTime) < new Date()
  )
  
  const hasNotifications = providerIssues.length > 0
  
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
            <NotificationPanel 
              notifications={providerIssues}
              onClose={() => setShowNotifications(false)}
            />
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
            <RecentActivityList activities={recentActivities.slice(0, 5)} />
            
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
