
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
  city?: string // Added city property as optional
}

export const useRequestsData = () => {
  // Updated data for past requests with the new service types
  const [pastRequests] = useState<Request[]>([
    {
      id: '9001',
      taskId: '2025-004',
      serviceType: 'Tire-Repair in Station',
      pickupTime: '2025-09-10 11:30',
      pickupLocation: '123 Main St, Dubai',
      dropoffLocation: '456 Business Ave, Dubai',
      status: 'Completed',
      notes: 'Delivered on time',
      city: 'Dubai'
    },
    {
      id: '9002',
      taskId: '2025-005',
      serviceType: 'Regular Towing',
      pickupTime: '2025-09-12 14:00',
      pickupLocation: '789 Market Blvd, Dubai',
      dropoffLocation: '321 Commerce St, Dubai',
      status: 'Completed',
      notes: 'Picked up successfully',
      city: 'Dubai'
    }
  ])
  
  // Updated data for today's requests
  const [todayRequests] = useState<Request[]>([
    {
      id: '10001',
      taskId: '2025-006',
      serviceType: 'Battery Replacement',
      pickupTime: '2025-09-15 10:15',
      pickupLocation: '555 Tech Park, Dubai',
      dropoffLocation: '777 Innovation Center, Dubai',
      status: 'In service',
      notes: 'Urgent delivery',
      city: 'Dubai'
    }
  ])
  
  // Updated data for future requests
  const [futureRequests] = useState<Request[]>([
    {
      id: '10002',
      taskId: '2025-007',
      serviceType: 'MVPI (Motor Vehicle Periodic Inspection)',
      pickupTime: '2025-09-20 09:30',
      pickupLocation: '888 Future Ave, Dubai',
      dropoffLocation: '999 Tomorrow St, Dubai',
      status: 'Waiting for provider',
      notes: 'Schedule in advance',
      city: 'Dubai'
    },
    {
      id: '10003',
      taskId: '2025-008',
      serviceType: 'Between Cities Regular Towing',
      pickupTime: '2025-09-22 13:45',
      pickupLocation: '111 Next Week Rd, Dubai',
      dropoffLocation: '222 Coming Soon Blvd, Abu Dhabi', // Note: Changed city to Abu Dhabi for variety
      status: 'Waiting for provider',
      notes: 'Large package',
      city: 'Abu Dhabi'
    }
  ])

  return {
    pastRequests,
    todayRequests,
    futureRequests
  }
}
