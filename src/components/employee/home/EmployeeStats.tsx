
import { useLanguageStore, translations } from '@/lib/i18n'
import { EmployeeStatCard } from '@/components/employee/home/EmployeeStatCard'
import { Order } from '@/types/orderManagement'

interface EmployeeStatsProps {
  pastOrders: Order[]
  todayOrders: Order[]
  futureOrders: Order[]
}

export const EmployeeStats = ({ pastOrders, todayOrders, futureOrders }: EmployeeStatsProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Calculate total number of orders
  const totalOrders = pastOrders.length + todayOrders.length + futureOrders.length
  
  // Count orders waiting for provider
  const ordersWaitingForProvider = [
    ...pastOrders,
    ...todayOrders,
    ...futureOrders
  ].filter(order => order.status === 'Waiting for provider').length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <EmployeeStatCard
        title={t.totalRequests}
        value={totalOrders}
        description={t.pastTodayFutureRequests}
        icon="Calendar"
      />
      <EmployeeStatCard
        title={t.todaysRequests}
        value={todayOrders.length}
        icon="Clock"
      />
      <EmployeeStatCard
        title={t.waitingForProvider}
        value={ordersWaitingForProvider}
        icon="User"
      />
    </div>
  )
}
