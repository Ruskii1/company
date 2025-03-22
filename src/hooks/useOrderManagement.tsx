import { useState, useEffect } from 'react'
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
    },
    {
      id: '1007',
      taskId: '2025-007',
      customerName: 'Legal Partners LLP',
      serviceType: 'Document Courier',
      pickupTime: '2025-06-14 13:15 PM',
      pickupLocation: 'Legal Tower, 15th Floor',
      dropoffLocation: 'Courthouse, Records Department',
      status: 'Completed'
    },
    {
      id: '1008',
      taskId: '2025-008',
      customerName: 'Smart Electronics',
      serviceType: 'Electronics Delivery',
      pickupTime: '2025-06-15 15:45 PM',
      pickupLocation: 'Electronics Warehouse, Bay 12',
      dropoffLocation: 'Smart Home Exhibition, Booth 78',
      status: 'In route'
    },
    {
      id: '1009',
      taskId: '2025-009',
      customerName: 'Fresh Foods Inc',
      serviceType: 'Refrigerated Transport',
      pickupTime: '2025-06-16 06:00 AM',
      pickupLocation: 'Fresh Foods Distribution Center',
      dropoffLocation: 'Downtown Grocery Outlets',
      status: 'Pending'
    },
    {
      id: '1010',
      taskId: '2025-010',
      customerName: 'Education First',
      serviceType: 'School Supplies',
      pickupTime: '2025-06-17 08:30 AM',
      pickupLocation: 'Education Warehouse',
      dropoffLocation: 'Multiple School Districts',
      status: 'Pending'
    }
  ]
  
  const [allOrders, setAllOrders] = useState<Order[]>(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(initialOrders)
  const [pastOrders, setPastOrders] = useState<Order[]>([])
  const [todayOrders, setTodayOrders] = useState<Order[]>([])
  const [futureOrders, setFutureOrders] = useState<Order[]>([])
  
  // Function to categorize orders based on date and status
  const categorizeOrders = () => {
    const now = new Date()
    const today = new Date(now)
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const past: Order[] = []
    const current: Order[] = []
    const future: Order[] = []
    
    allOrders.forEach(order => {
      const pickupTime = new Date(order.pickupTime)
      
      // Update status based on time
      let updatedOrder = { ...order }
      
      if (order.status === 'Completed') {
        // Completed orders always go to past
        past.push(updatedOrder)
      } else if (pickupTime < now) {
        // Past time, not completed - should be in progress
        if (order.status === 'Pending') {
          updatedOrder = { ...order, status: 'Waiting for provider' }
        }
        // Time has passed, but order is in progress
        current.push(updatedOrder)
      } else if (pickupTime < tomorrow) {
        // Today but in the future
        current.push(updatedOrder)
      } else {
        // Future days
        future.push(updatedOrder)
      }
    })
    
    // Update state with categorized orders
    setPastOrders(past)
    setTodayOrders(current)
    setFutureOrders(future)
    
    // Update allOrders if any status was changed
    const updatedAllOrders = [...past, ...current, ...future]
    if (JSON.stringify(updatedAllOrders) !== JSON.stringify(allOrders)) {
      setAllOrders(updatedAllOrders)
      setFilteredOrders(updatedAllOrders)
    }
  }
  
  // Categorize orders on initial load and when orders change
  useEffect(() => {
    categorizeOrders()
    
    // Set up interval to check for time-based status changes every minute
    const intervalId = setInterval(categorizeOrders, 60000)
    
    return () => clearInterval(intervalId)
  }, [allOrders])
  
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
    
    // Update all orders which will trigger recategorization
    setAllOrders(updatedOrders)
    
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
    
    // Recategorize after filtering
    categorizeOrders()
  }

  return {
    orders: filteredOrders,
    allOrders,
    pastOrders,
    todayOrders,
    futureOrders,
    handleStatusChange,
    applyFilter
  }
}
