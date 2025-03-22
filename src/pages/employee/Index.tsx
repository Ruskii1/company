
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from 'sonner'
import { useLanguageStore, translations } from '@/lib/i18n'
import { OrderManagementTable } from '@/components/employee/OrderManagementTable'
import { OrderManagementFilter, FilterValues } from '@/components/employee/OrderManagementFilter'
import { useOrderManagement } from '@/hooks/useOrderManagement'
import { serviceTypeValues } from '@/components/forms/ServiceTypeField'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Clock, Calendar, History } from 'lucide-react'

const EmployeePortal = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { 
    orders,
    pastOrders, 
    todayOrders, 
    futureOrders, 
    handleStatusChange, 
    applyFilter 
  } = useOrderManagement()
  
  const [activeTab, setActiveTab] = useState('today')
  
  const handleFilterSubmit = (data: FilterValues) => {
    applyFilter(data)
  }
  
  const handleFilterChange = (data: FilterValues) => {
    applyFilter(data)
  }

  return (
    <>
      <Toaster />
      <h1 className="text-4xl font-bold text-center mb-12">{t.employeePortal}</h1>
      
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.orderManagement}</CardTitle>
          <OrderManagementFilter 
            onSubmit={handleFilterSubmit}
            onFilterChange={handleFilterChange}
            serviceTypeValues={serviceTypeValues}
          />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="past" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                {t.pastRequests}
              </TabsTrigger>
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t.todaysRequests}
              </TabsTrigger>
              <TabsTrigger value="future" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t.futureRequests}
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
                  <p className="text-gray-500 dark:text-gray-300">{t.noPastRequests}</p>
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
                  <p className="text-gray-500 dark:text-gray-300">{t.noTodayRequests}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="future">
              {futureOrders.length > 0 ? (
                <OrderManagementTable 
                  orders={futureOrders} 
                  onStatusChange={handleStatusChange} 
                />
              ) : (
                <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-300">{t.noFutureRequests}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}

export default EmployeePortal
