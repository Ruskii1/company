
import { Toaster } from 'sonner'
import { useLanguageStore, translations } from '@/lib/i18n'
import { FilterValues } from '@/types/orderManagement'
import { useOrderManagement } from '@/hooks/useOrderManagement'
import { serviceTypeValues } from '@/components/forms/ServiceTypeField'
import { useState } from 'react'
import { FilterSection } from '@/components/employee/FilterSection'
import { TabsSection } from '@/components/employee/TabsSection'
import { EmployeeStats } from '@/components/employee/home/EmployeeStats'

const EmployeePortal = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { 
    orders,
    pastOrders, 
    todayOrders, 
    futureOrders, 
    handleStatusChange, 
    applyFilter,
    getCities
  } = useOrderManagement()
  
  const [activeTab, setActiveTab] = useState('today')
  
  const handleFilterSubmit = (data: FilterValues) => {
    applyFilter(data)
  }
  
  const handleFilterChange = (data: FilterValues) => {
    applyFilter(data)
  }

  // Get unique status values
  const statusValues = [
    "Pending", 
    "Waiting for provider", 
    "In route", 
    "Arrived at the pick-up location", 
    "In service", 
    "Completed"
  ]
  
  // Get unique cities
  const cityValues = getCities()

  return (
    <>
      <Toaster />
      <h1 className="text-4xl font-bold text-center mb-12">{t.orderManagement}</h1>
      
      {/* Stats Overview */}
      <EmployeeStats 
        pastOrders={pastOrders}
        todayOrders={todayOrders}
        futureOrders={futureOrders}
      />
      
      <div className="mt-8">
        <FilterSection
          handleFilterSubmit={handleFilterSubmit}
          handleFilterChange={handleFilterChange}
          serviceTypeValues={serviceTypeValues}
          statusValues={statusValues}
          cityValues={cityValues}
        />
      </div>
      
      <div className="mt-6">
        <TabsSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pastOrders={pastOrders}
          todayOrders={todayOrders}
          futureOrders={futureOrders}
          handleStatusChange={handleStatusChange}
        />
      </div>
    </>
  )
}

export default EmployeePortal
