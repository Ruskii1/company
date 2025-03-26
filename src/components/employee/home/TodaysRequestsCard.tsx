
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

interface Order {
  id: string
  customerName: string
  serviceType: string
  pickupTime: number
  status: string
}

interface TodaysRequestsCardProps {
  todayOrders: Order[]
}

export function TodaysRequestsCard({ todayOrders }: TodaysRequestsCardProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
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
  )
}
