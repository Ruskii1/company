
import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { EmployeeStatCard } from '@/components/employee/home/EmployeeStatCard'
import { RecentActivityCard } from '@/components/employee/home/RecentActivityCard'
import { TodaysRequestsCard } from '@/components/employee/home/TodaysRequestsCard'
import { AttentionRequiredCard } from '@/components/employee/home/AttentionRequiredCard'
import { useActivities } from '@/hooks/useActivities'

const EmployeeHomePage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { activities } = useActivities()
  
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
  
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl font-bold">{t.home}</h1>
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
        <RecentActivityCard activities={activities} />
        <TodaysRequestsCard todayOrders={todayOrders} />
        <AttentionRequiredCard providerIssues={providerIssues} />
      </div>
    </>
  )
}

export default EmployeeHomePage
