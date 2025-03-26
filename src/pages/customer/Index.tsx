
import { useLanguageStore, translations } from '@/lib/i18n'
import { CustomerOverview } from '@/components/customer/dashboard/CustomerOverview'
import { CustomerNotifications } from '@/components/customer/dashboard/CustomerNotifications'
import { RecentActivities } from '@/components/customer/dashboard/RecentActivities'

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
    </div>
  )
}

export default Index
