
import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { NewOrderForm } from '@/components/NewOrderForm'
import { OrderTable } from '@/components/OrderTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Index = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Updated orders data with new service types
  const [orders] = useState<any[]>([
    {
      id: '1001',
      taskId: '2025-001',
      companyName: 'TechCorp',
      employeeName: 'John Smith',
      serviceType: 'Regular Towing',
      pickupTime: '2025-09-15 14:30',
      pickupLocation: '123 Main St, Dubai',
      dropoffLocation: '456 Business Ave, Dubai',
      notes: 'Handle with care',
      status: 'Completed'
    },
    {
      id: '1002',
      taskId: '2025-002',
      companyName: 'GlobalTrade',
      employeeName: 'Sarah Johnson',
      serviceType: 'Battery Jumpstart',
      pickupTime: '2025-09-16 10:00',
      pickupLocation: '789 Market Blvd, Dubai',
      dropoffLocation: '321 Commerce St, Dubai',
      notes: 'Call before delivery',
      status: 'In route'
    },
    {
      id: '1003',
      taskId: '2025-003',
      companyName: 'SmartSolutions',
      employeeName: 'Michael Brown',
      serviceType: 'Fuel Delivery 95',
      pickupTime: '2025-09-17 09:15',
      pickupLocation: '555 Tech Park, Dubai',
      dropoffLocation: '777 Innovation Center, Dubai',
      notes: '',
      status: 'Waiting for provider'
    }
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.customerPortal}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.placeNewOrder}</CardTitle>
        </CardHeader>
        <CardContent>
          <NewOrderForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.yourOrders}</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTable orders={orders} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Index
