import { useState } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle'
import { NewOrderForm } from '@/components/NewOrderForm'
import { OrderTable } from '@/components/OrderTable'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Index = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [orders] = useState<any[]>([])

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <LanguageToggle />
      
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">{t.customerPortal}</h1>
        
        <Card className="backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle>{t.placeNewOrder}</CardTitle>
          </CardHeader>
          <CardContent>
            <NewOrderForm />
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle>{t.yourOrders}</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTable orders={orders} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Index
