
import { useLanguageStore, translations } from '@/lib/i18n'
import { CustomerOverview } from '@/components/customer/dashboard/CustomerOverview'
import { CustomerNotifications } from '@/components/customer/dashboard/CustomerNotifications'
import { RecentActivities } from '@/components/customer/dashboard/RecentActivities'
import { NewOrderDashboard } from '@/components/customer/dashboard/NewOrderDashboard'
import { OrdersDashboard } from '@/components/customer/dashboard/OrdersDashboard'

const Index = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.customerPortal}</h1>
      
      {/* Dashboard Overview */}
      <CustomerOverview />
      
      {/* Notifications (only shows when there are notifications) */}
      <CustomerNotifications />
      
      {/* Recent Activities */}
      <RecentActivities />
      
      {/* Place New Order Section */}
      <NewOrderDashboard />
      
      {/* Orders Dashboard */}
      <OrdersDashboard />
    </div>
  )
}

export default Index
