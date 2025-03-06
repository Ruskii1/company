
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar, Clock, History } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Requests = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('today')
  
  // Dummy data for past requests
  const pastRequests = [
    {
      id: 'ORD-9001',
      serviceType: 'Document Delivery',
      pickupTime: '2023-09-10 11:30',
      pickupLocation: '123 Main St, Dubai',
      dropoffLocation: '456 Business Ave, Dubai',
      status: 'Completed'
    },
    {
      id: 'ORD-9002',
      serviceType: 'Package Pickup',
      pickupTime: '2023-09-12 14:00',
      pickupLocation: '789 Market Blvd, Dubai',
      dropoffLocation: '321 Commerce St, Dubai',
      status: 'Completed'
    }
  ]
  
  // Dummy data for today's requests
  const todayRequests = [
    {
      id: 'ORD-10001',
      serviceType: 'Express Delivery',
      pickupTime: '2023-09-15 10:15',
      pickupLocation: '555 Tech Park, Dubai',
      dropoffLocation: '777 Innovation Center, Dubai',
      status: 'In Progress'
    }
  ]
  
  // Dummy data for future requests
  const futureRequests = [
    {
      id: 'ORD-10002',
      serviceType: 'Document Delivery',
      pickupTime: '2023-09-20 09:30',
      pickupLocation: '888 Future Ave, Dubai',
      dropoffLocation: '999 Tomorrow St, Dubai',
      status: 'Scheduled'
    },
    {
      id: 'ORD-10003',
      serviceType: 'Package Delivery',
      pickupTime: '2023-09-22 13:45',
      pickupLocation: '111 Next Week Rd, Dubai',
      dropoffLocation: '222 Coming Soon Blvd, Dubai',
      status: 'Scheduled'
    }
  ]

  const renderRequestsTable = (requests: any[]) => {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.id}</TableHead>
              <TableHead>{t.serviceType}</TableHead>
              <TableHead>{t.pickupTime}</TableHead>
              <TableHead>{t.pickupLocation}</TableHead>
              <TableHead>{t.dropoffLocation}</TableHead>
              <TableHead>{t.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.serviceType}</TableCell>
                <TableCell>{request.pickupTime}</TableCell>
                <TableCell>{request.pickupLocation}</TableCell>
                <TableCell>{request.dropoffLocation}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.allRequests}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.allRequests}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="past" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                {t.pastRequests}
              </TabsTrigger>
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t.todaysRequests}
              </TabsTrigger>
              <TabsTrigger value="future" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t.futureRequests}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="past" className="space-y-4">
              {pastRequests.length > 0 ? (
                renderRequestsTable(pastRequests)
              ) : (
                <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-300">{t.noPastRequests}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="today" className="space-y-4">
              {todayRequests.length > 0 ? (
                renderRequestsTable(todayRequests)
              ) : (
                <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-300">{t.noTodayRequests}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="future" className="space-y-4">
              {futureRequests.length > 0 ? (
                renderRequestsTable(futureRequests)
              ) : (
                <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-300">{t.noFutureRequests}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Requests
