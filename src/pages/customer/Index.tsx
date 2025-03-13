
import { useLanguageStore, translations } from '@/lib/i18n'
import { NewOrderDashboard } from '@/components/customer/dashboard/NewOrderDashboard'
import { OrdersDashboard } from '@/components/customer/dashboard/OrdersDashboard'

const Index = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.customerPortal}</h1>
      
      <NewOrderDashboard />
      <OrdersDashboard />
    </div>
  )
}

export default Index
