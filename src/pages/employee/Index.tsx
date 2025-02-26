
import { useState } from 'react'
import { OrderManagementTable } from '@/components/employee/OrderManagementTable'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const EmployeePortal = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [orders] = useState<any[]>([])

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12">{t.employeePortal}</h1>
      
      <Card className="backdrop-blur-sm bg-white/80">
        <CardHeader>
          <CardTitle>{t.orderManagement}</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderManagementTable orders={orders} />
        </CardContent>
      </Card>
    </>
  )
}

export default EmployeePortal
