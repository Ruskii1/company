
import { useState } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle'
import { NewOrderForm } from '@/components/NewOrderForm'
import { OrderTable } from '@/components/OrderTable'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, UserCircle2, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [orders] = useState<any[]>([])
  const navigate = useNavigate()

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4 dir-ltr">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/employee')}
          className="bg-white hover:bg-gray-100"
          title="Go to Employee Portal"
        >
          <UserCircle2 className="h-5 w-5" />
        </Button>
        <LanguageToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={handleLogout}
          className="bg-white hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
      
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
