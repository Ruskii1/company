
import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { EmployeeStatCard } from '@/components/employee/home/EmployeeStatCard'
import { NotificationButton } from '@/components/employee/home/NotificationButton'
import { RecentActivityCard } from '@/components/employee/home/RecentActivityCard'
import { TodaysRequestsCard } from '@/components/employee/home/TodaysRequestsCard'
import { AttentionRequiredCard } from '@/components/employee/home/AttentionRequiredCard'
import { Activity } from '@/types/activity'

const EmployeeHomePage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
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
  
  // Updated dummy data for recent activities to match the Activity type
  const recentActivities: Activity[] = [
    {
      id: "act-001",
      type: "request",
      description: "New request created by TechCorp LLC",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      entityType: "Request",
      entityId: "TASK-1001",
      userId: "emp-001"
    },
    {
      id: "act-002",
      type: "edit",
      description: "Provider assigned to GlobalTrade Inc. request",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
      entityType: "Order",
      entityId: "TASK-1002",
      userId: "emp-002"
    },
    {
      id: "act-003",
      type: "edit",
      description: "Request for SmartSolutions SA marked as completed",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      entityType: "Order",
      entityId: "TASK-1003",
      userId: "emp-001"
    },
    {
      id: "act-004",
      type: "ticket",
      description: "New support ticket opened by InnovateX Ltd",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      entityType: "Ticket",
      entityId: "TICKET-001",
      userId: "emp-003"
    },
    {
      id: "act-005",
      type: "ticket",
      description: "Support ticket for QualityServices LLC resolved",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      entityType: "Ticket",
      entityId: "TICKET-002",
      userId: "emp-001"
    }
  ]
  
  return (
    <>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">{t.home}</h1>
        <NotificationButton 
          notificationCount={providerIssues.length} 
          hasNotifications={hasNotifications} 
        />
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
        <RecentActivityCard activities={recentActivities} />
        <TodaysRequestsCard todayOrders={todayOrders} />
        <AttentionRequiredCard providerIssues={providerIssues} />
      </div>
    </>
  )
}

export default EmployeeHomePage
