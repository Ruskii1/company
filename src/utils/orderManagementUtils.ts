import { Order } from '@/types/orderManagement'

/**
 * Categorizes orders into past, today, and future based on their pickup time and status
 */
export const categorizeOrders = (
  orders: Order[]
): { past: Order[], today: Order[], future: Order[] } => {
  const now = new Date()
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const past: Order[] = []
  const current: Order[] = []
  const future: Order[] = []
  
  orders.forEach(order => {
    const pickupTime = new Date(order.pickupTime)
    
    // Update status based on time
    let updatedOrder = { ...order }
    
    if (order.status === 'Completed') {
      // Completed orders always go to past
      past.push(updatedOrder)
    } else if (pickupTime < now) {
      // Past time, not completed - should be in progress
      if (order.status === 'Pending') {
        // Automatically escalate status from Pending to Waiting for provider
        updatedOrder = { ...order, status: 'Waiting for provider' }
      }
      // Time has passed, but order is in progress
      current.push(updatedOrder)
    } else if (pickupTime < tomorrow) {
      // Today but in the future
      if (pickupTime <= now) {
        // Due now - automatically escalate from Pending to Waiting for provider
        if (order.status === 'Pending') {
          updatedOrder = { ...order, status: 'Waiting for provider' }
        }
        current.push(updatedOrder)
      } else {
        // Today but not due yet
        current.push(updatedOrder)
      }
    } else {
      // Future days - only include pending orders in future
      if (order.status === 'Pending') {
        future.push(updatedOrder)
      } else {
        // Non-pending future orders go to today's list
        current.push(updatedOrder)
      }
    }
  })
  
  return { past, today: current, future }
}

/**
 * Filters orders based on search criteria
 */
export const filterOrders = (
  orders: Order[], 
  filters: { 
    searchValue?: string,
    status?: string,
    serviceType?: string,
    city?: string,
    providerId?: string,
    providerPhone?: string
  }
): Order[] => {
  let filteredOrders = [...orders];
  
  // Filter by search value (task ID or customer name)
  if (filters.searchValue) {
    const lowercaseSearch = filters.searchValue.toLowerCase();
    filteredOrders = filteredOrders.filter(order => 
      order.taskId.toLowerCase().includes(lowercaseSearch) || 
      order.customerName.toLowerCase().includes(lowercaseSearch)
    );
  }
  
  // Filter by status
  if (filters.status) {
    filteredOrders = filteredOrders.filter(order => 
      order.status === filters.status
    );
  }
  
  // Filter by service type
  if (filters.serviceType && filters.serviceType !== 'all') {
    filteredOrders = filteredOrders.filter(order => 
      order.serviceType === filters.serviceType
    );
  }
  
  // Filter by city
  if (filters.city) {
    filteredOrders = filteredOrders.filter(order => {
      const city = order.city || extractCityFromLocation(order.pickupLocation);
      return city.toLowerCase().includes(filters.city!.toLowerCase());
    });
  }
  
  // Filter by provider ID
  if (filters.providerId) {
    filteredOrders = filteredOrders.filter(order => 
      order.providerId?.toLowerCase().includes(filters.providerId!.toLowerCase())
    );
  }
  
  // Filter by provider phone
  if (filters.providerPhone) {
    filteredOrders = filteredOrders.filter(order => 
      order.providerPhone?.toLowerCase().includes(filters.providerPhone!.toLowerCase())
    );
  }
  
  return filteredOrders;
}

/**
 * Extract the city from a location string
 * Example: "123 Main St, New York, NY 10001" -> "New York"
 */
export const extractCityFromLocation = (location: string): string => {
  // Simple extraction - assumes format like "address, city, state zip"
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}

/**
 * Get the next status in the workflow for a given order status
 */
export const getNextStatus = (currentStatus: string): string => {
  switch (currentStatus) {
    case 'Pending':
      return 'Scheduled'
    case 'Scheduled':
      return 'Waiting for provider'
    case 'Waiting for provider':
      return 'In route'
    case 'In route':
      return 'Arrived at the pick-up location'
    case 'Arrived at the pick-up location':
      return 'In service'
    case 'In service':
      return 'Completed'
    default:
      return currentStatus
  }
}
