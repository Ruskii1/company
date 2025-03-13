
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from 'sonner'
import { useLanguageStore, translations } from '@/lib/i18n'
import { OrderManagementTable } from '@/components/employee/OrderManagementTable'
import { OrderManagementFilter, FilterValues } from '@/components/employee/OrderManagementFilter'
import { useOrderManagement } from '@/hooks/useOrderManagement'
import { serviceTypeValues } from '@/components/forms/ServiceTypeField'

const EmployeePortal = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { orders, handleStatusChange, applyFilter } = useOrderManagement()
  
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
          <OrderManagementTable 
            orders={orders} 
            onStatusChange={handleStatusChange} 
          />
        </CardContent>
      </Card>
    </>
  )
}

export default EmployeePortal
