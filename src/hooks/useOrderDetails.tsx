
import { useState, useEffect } from 'react'

interface Note {
  id: string
  sender: 'customer' | 'employee'
  message: string
  timestamp: string
  senderName: string
}

interface Order {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes?: string
  timeTracking: {
    acceptedAt: string
    inRouteAt: string
    arrivedAt: string
    inServiceAt: string
    dropoffAt: string
  }
  provider: {
    name: string
    phone: string
    rating: number
    corporationName: string
    images: {
      pickup: string[]
      dropoff: string[]
    }
    location: {
      lat: number
      lng: number
    }
  }
  car: {
    plate: string
    model: string
    name: string
    vin: string
  }
  conversation: Note[]
}

export const useOrderDetails = (taskId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true)
      
      // This simulates an API call
      setTimeout(() => {
        const mockOrder: Order = {
          id: '1001',
          taskId: '2023-001',
          customerName: 'Acme Corporation',
          serviceType: 'Package Delivery',
          pickupTime: '2023-06-15 09:00 AM',
          pickupLocation: '123 Business Ave, Tower A',
          dropoffLocation: '456 Commerce St, Suite 300',
          status: 'Completed',
          notes: 'Handle with care. Fragile items inside.',
          timeTracking: {
            acceptedAt: '2023-06-15 08:45 AM',
            inRouteAt: '2023-06-15 08:50 AM',
            arrivedAt: '2023-06-15 09:00 AM',
            inServiceAt: '2023-06-15 09:05 AM',
            dropoffAt: '2023-06-15 10:00 AM'
          },
          provider: {
            name: 'John Doe',
            phone: '+1 (555) 123-4567',
            rating: 4.8,
            corporationName: 'Express Delivery Inc.',
            images: {
              pickup: [
                '/placeholder.svg',
                '/placeholder.svg',
                '/placeholder.svg',
                '/placeholder.svg'
              ],
              dropoff: [
                '/placeholder.svg',
                '/placeholder.svg',
                '/placeholder.svg',
                '/placeholder.svg'
              ]
            },
            location: {
              lat: 37.7749,
              lng: -122.4194
            }
          },
          car: {
            plate: 'ABC-1234',
            model: 'Toyota Camry',
            name: 'Sedan',
            vin: '1HGCM82633A123456'
          },
          conversation: [
            {
              id: '1',
              sender: 'customer',
              message: 'Hi, could you please make sure the package is delivered before noon?',
              timestamp: '2023-06-14 10:15 AM',
              senderName: 'Acme Corporation'
            },
            {
              id: '2',
              sender: 'employee',
              message: 'Yes, we\'ve scheduled it for 9:00 AM delivery. Our driver will call you 30 minutes before arrival.',
              timestamp: '2023-06-14 10:20 AM',
              senderName: 'Support Team'
            },
            {
              id: '3',
              sender: 'customer',
              message: 'Great, thank you! Is there any way to track the delivery?',
              timestamp: '2023-06-14 10:25 AM',
              senderName: 'Acme Corporation'
            },
            {
              id: '4',
              sender: 'employee',
              message: 'You\'ll receive a tracking link via email once the driver picks up your package. You can also check status updates in your account dashboard.',
              timestamp: '2023-06-14 10:30 AM',
              senderName: 'Support Team'
            }
          ]
        }
        
        // Find the order that matches the taskId
        if (taskId === '2023-002') {
          mockOrder.taskId = '2023-002'
          mockOrder.status = 'In route'
          mockOrder.serviceType = 'Package Pickup'
        } else if (taskId === '2023-003') {
          mockOrder.taskId = '2023-003'
          mockOrder.status = 'Waiting for provider'
          mockOrder.serviceType = 'Express Delivery'
        } else if (taskId === '2023-004' || taskId === '2023-005') {
          mockOrder.taskId = taskId
          mockOrder.status = 'Completed'
        } else if (taskId === '2023-006') {
          mockOrder.taskId = taskId
          mockOrder.status = 'In service'
        } else if (taskId === '2023-007' || taskId === '2023-008') {
          mockOrder.taskId = taskId
          mockOrder.status = 'Waiting for provider'
        }
        
        setOrder(mockOrder)
        setLoading(false)
      }, 500)
    }

    fetchOrderDetails()
  }, [taskId])

  const addNoteToConversation = (message: string) => {
    if (!order) return;

    const newNote: Note = {
      id: Date.now().toString(),
      sender: 'customer',
      message,
      timestamp: new Date().toLocaleString(),
      senderName: 'You'
    };

    setOrder({
      ...order,
      conversation: [...order.conversation, newNote]
    });
  }

  return { 
    order, 
    loading, 
    addNoteToConversation 
  }
}
