import { useState, useEffect } from 'react'
import { OrderManagementTable } from '@/components/employee/OrderManagementTable'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from 'sonner'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'

const filterSchema = z.object({
  taskId: z.string().optional()
})

type FilterValues = z.infer<typeof filterSchema>

const EmployeePortal = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Updated dummy data with new task ID format
  const [allOrders, setAllOrders] = useState([
    {
      id: '1001',
      taskId: '2025-001',
      customerName: 'Acme Corporation',
      serviceType: 'Package Delivery',
      pickupTime: '2025-06-15 09:00 AM',
      pickupLocation: '123 Business Ave, Tower A',
      dropoffLocation: '456 Commerce St, Suite 300',
      status: 'Completed'
    },
    {
      id: '1002',
      taskId: '2025-002',
      customerName: 'TechWave Solutions',
      serviceType: 'Document Courier',
      pickupTime: '2025-06-15 11:30 AM',
      pickupLocation: '789 Innovation Blvd',
      dropoffLocation: '321 Progress Way',
      status: 'In service'
    },
    {
      id: '1003',
      taskId: '2025-003',
      customerName: 'Global Finance Inc',
      serviceType: 'Express Delivery',
      pickupTime: '2025-06-16 08:45 AM',
      pickupLocation: '555 Financial Plaza',
      dropoffLocation: '777 Banking Avenue',
      status: 'Waiting for provider'
    },
    {
      id: '1004',
      taskId: '2025-004',
      customerName: 'Healthcare Partners',
      serviceType: 'Medical Supplies',
      pickupTime: '2025-06-16 14:15 PM',
      pickupLocation: 'Medical Center, Building C',
      dropoffLocation: 'City Hospital, North Wing',
      status: 'In route'
    },
    {
      id: '1005',
      taskId: '2025-005',
      customerName: 'Retail Distributors Ltd',
      serviceType: 'Retail Delivery',
      pickupTime: '2025-06-17 10:00 AM',
      pickupLocation: 'Distribution Center #3',
      dropoffLocation: 'Downtown Mall, Store 125',
      status: 'Arrived at the pick-up location'
    }
  ])
  
  const [orders, setOrders] = useState(allOrders)
  
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      taskId: ''
    }
  })

  const handleStatusChange = (id: string, newStatus: string) => {
    const updatedOrders = allOrders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    )
    
    setAllOrders(updatedOrders)
    
    // Apply current filter to updated orders
    const searchValue = form.getValues().taskId?.toLowerCase() || ''
    if (searchValue) {
      const filtered = updatedOrders.filter(order => 
        order.taskId.toLowerCase().includes(searchValue) || 
        order.customerName.toLowerCase().includes(searchValue)
      )
      setOrders(filtered)
    } else {
      setOrders(updatedOrders)
    }
  }
  
  const onSubmit = (data: FilterValues) => {
    const searchValue = data.taskId?.toLowerCase() || ''
    
    if (searchValue) {
      const filtered = allOrders.filter(order => 
        order.taskId.toLowerCase().includes(searchValue) || 
        order.customerName.toLowerCase().includes(searchValue)
      )
      setOrders(filtered)
    } else {
      setOrders(allOrders)
    }
  }
  
  useEffect(() => {
    // Watch for changes in the search field and filter as user types
    const subscription = form.watch((value) => {
      const searchValue = value.taskId?.toLowerCase() || ''
      
      if (searchValue) {
        const filtered = allOrders.filter(order => 
          order.taskId.toLowerCase().includes(searchValue) || 
          order.customerName.toLowerCase().includes(searchValue)
        )
        setOrders(filtered)
      } else {
        setOrders(allOrders)
      }
    })
    
    return () => subscription.unsubscribe()
  }, [form, allOrders])

  return (
    <>
      <Toaster />
      <h1 className="text-4xl font-bold text-center mb-12">{t.employeePortal}</h1>
      
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.orderManagement}</CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="taskId"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormLabel className="whitespace-nowrap">{t.taskId}:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder={`${t.enterRequestNumber}`}
                          className="pr-8 min-w-[250px]" 
                          {...field} 
                        />
                        <Button 
                          type="submit" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardHeader>
        <CardContent>
          <OrderManagementTable 
            orders={orders} 
            onStatusChange={handleStatusChange} 
          />
        </CardContent>
      </Card>
    </>
  )
}

export default EmployeePortal
