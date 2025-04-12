
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { History, Clock, Calendar } from 'lucide-react'
import { OrderManagementTable } from '@/components/employee/OrderManagementTable'
import { Order } from '@/types/orderManagement'

interface TabsSectionProps {
  activeTab: string
  setActiveTab: (value: string) => void
  pastOrders: Order[]
  todayOrders: Order[]
  futureOrders: Order[]
  handleStatusChange: (id: string, newStatus: string) => void
}

export const TabsSection = ({ 
  activeTab,
  setActiveTab,
  pastOrders,
  todayOrders,
  futureOrders,
  handleStatusChange
}: TabsSectionProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="past" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          {t.pastRequests || "Past Requests"}
        </TabsTrigger>
        <TabsTrigger value="today" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {t.todaysRequests || "Today's Requests"}
        </TabsTrigger>
        <TabsTrigger value="future" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t.futureRequests || "Future Requests"}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="past">
        {pastOrders.length > 0 ? (
          <OrderManagementTable 
            orders={pastOrders} 
            onStatusChange={handleStatusChange} 
          />
        ) : (
          <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-300">{t.noPastRequests || "No past requests"}</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="today">
        {todayOrders.length > 0 ? (
          <OrderManagementTable 
            orders={todayOrders} 
            onStatusChange={handleStatusChange} 
          />
        ) : (
          <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-300">{t.noTodayRequests || "No requests for today"}</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="future">
        {futureOrders.length > 0 ? (
          <OrderManagementTable 
            orders={futureOrders} 
            onStatusChange={handleStatusChange}
            isFutureTab={true}
          />
        ) : (
          <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-300">{t.noFutureRequests || "No future requests"}</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
