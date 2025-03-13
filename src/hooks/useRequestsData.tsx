
import { useState } from 'react'

interface Request {
  id: string
  taskId: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes: string
}

export const useRequestsData = () => {
  // Dummy data for past requests with updated task IDs
  const [pastRequests] = useState<Request[]>([
    {
      id: '9001',
      taskId: '2025-004',
      serviceType: 'Document Delivery',
      pickupTime: '2025-09-10 11:30',
      pickupLocation: '123 Main St, Dubai',
      dropoffLocation: '456 Business Ave, Dubai',
      status: 'Completed',
      notes: 'Delivered on time'
    },
    {
      id: '9002',
      taskId: '2025-005',
      serviceType: 'Package Pickup',
      pickupTime: '2025-09-12 14:00',
      pickupLocation: '789 Market Blvd, Dubai',
      dropoffLocation: '321 Commerce St, Dubai',
      status: 'Completed',
      notes: 'Picked up successfully'
    }
  ])
  
  // Dummy data for today's requests
  const [todayRequests] = useState<Request[]>([
    {
      id: '10001',
      taskId: '2025-006',
      serviceType: 'Express Delivery',
      pickupTime: '2025-09-15 10:15',
      pickupLocation: '555 Tech Park, Dubai',
      dropoffLocation: '777 Innovation Center, Dubai',
      status: 'In service',
      notes: 'Urgent delivery'
    }
  ])
  
  // Dummy data for future requests
  const [futureRequests] = useState<Request[]>([
    {
      id: '10002',
      taskId: '2025-007',
      serviceType: 'Document Delivery',
      pickupTime: '2025-09-20 09:30',
      pickupLocation: '888 Future Ave, Dubai',
      dropoffLocation: '999 Tomorrow St, Dubai',
      status: 'Waiting for provider',
      notes: 'Schedule in advance'
    },
    {
      id: '10003',
      taskId: '2025-008',
      serviceType: 'Package Delivery',
      pickupTime: '2025-09-22 13:45',
      pickupLocation: '111 Next Week Rd, Dubai',
      dropoffLocation: '222 Coming Soon Blvd, Dubai',
      status: 'Waiting for provider',
      notes: 'Large package'
    }
  ])

  return {
    pastRequests,
    todayRequests,
    futureRequests
  }
}
