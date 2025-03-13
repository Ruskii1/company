
import { useState } from 'react'
import { FilterValues } from '@/components/employee/OrderManagementFilter'
import { toast } from 'sonner'

interface Order {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
}

export const useOrderManagement = () => {
  // Initial dummy data
  const initialOrders: Order[] = [
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
    },
    {
      id: '1006',
      taskId: '2025-006',
      customerName: 'New Startup Inc',
      serviceType: 'Express Delivery',
      pickupTime: '2025-06-18 09:30 AM',
      pickupLocation: 'Tech Hub, Floor 3',
      dropoffLocation: 'Innovation Center, Room 201',
      status: 'Pending'
    }
  ]
  
  const [allOrders, setAllOrders] = useState<Order[]>(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(initialOrders)
  
  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Starting status update for order ${id} to ${newStatus}`)
    
    // Create a completely new array with the updated order
    const updatedOrders = allOrders.map((order) => {
      if (order.id === id) {
        console.log(`Found order ${id}, changing status from ${order.status} to ${newStatus}`)
        return { ...order, status: newStatus }
      }
      return order
    })
    
    // Update both state variables directly
    setAllOrders(updatedOrders)
    setFilteredOrders(
      // Apply any current filtering
      filteredOrders.map((order) => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    )
    
    toast.success(`Order status updated to ${newStatus}`)
    console.log(`Status update completed for order ${id}`)
  }
  
  const applyFilter = (data: FilterValues) => {
    const searchValue = data.taskId?.toLowerCase() || ''
    
    if (searchValue) {
      const filtered = allOrders.filter(order => 
        order.taskId.toLowerCase().includes(searchValue) || 
        order.customerName.toLowerCase().includes(searchValue)
      )
      setFilteredOrders(filtered)
    } else {
      setFilteredOrders(allOrders)
    }
  }

  return {
    orders: filteredOrders,
    allOrders,
    handleStatusChange,
    applyFilter
  }
}
