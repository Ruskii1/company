
import { useState } from 'react'
import { OrderManagementTable } from '@/components/employee/OrderManagementTable'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const EmployeePortal = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Dummy order data for demonstration
  const [orders] = useState([
    {
      id: '1001',
      taskId: 'TASK-2023-001',
      customerName: 'Acme Corporation',
      serviceType: 'Package Delivery',
      pickupTime: '2023-06-15 09:00 AM',
      pickupLocation: '123 Business Ave, Tower A',
      dropoffLocation: '456 Commerce St, Suite 300',
      status: 'Completed'
    },
    {
      id: '1002',
      taskId: 'TASK-2023-002',
      customerName: 'TechWave Solutions',
      serviceType: 'Document Courier',
      pickupTime: '2023-06-15 11:30 AM',
      pickupLocation: '789 Innovation Blvd',
      dropoffLocation: '321 Progress Way',
      status: 'In Progress'
    },
    {
      id: '1003',
      taskId: 'TASK-2023-003',
      customerName: 'Global Finance Inc',
      serviceType: 'Express Delivery',
      pickupTime: '2023-06-16 08:45 AM',
      pickupLocation: '555 Financial Plaza',
      dropoffLocation: '777 Banking Avenue',
      status: 'Pending'
    },
    {
      id: '1004',
      taskId: 'TASK-2023-004',
      customerName: 'Healthcare Partners',
      serviceType: 'Medical Supplies',
      pickupTime: '2023-06-16 14:15 PM',
      pickupLocation: 'Medical Center, Building C',
      dropoffLocation: 'City Hospital, North Wing',
      status: 'Scheduled'
    },
    {
      id: '1005',
      taskId: 'TASK-2023-005',
      customerName: 'Retail Distributors Ltd',
      serviceType: 'Retail Delivery',
      pickupTime: '2023-06-17 10:00 AM',
      pickupLocation: 'Distribution Center #3',
      dropoffLocation: 'Downtown Mall, Store 125',
      status: 'Pending'
    }
  ])

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12">{t.employeePortal}</h1>
      
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
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
