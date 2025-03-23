
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Order, FilterValues } from '@/types/orderManagement'
import { initialOrders } from '@/data/mockOrders'
import { categorizeOrders, filterOrders } from '@/utils/orderManagementUtils'

export const useOrderManagement = () => {
  const [allOrders, setAllOrders] = useState<Order[]>(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(initialOrders)
  const [pastOrders, setPastOrders] = useState<Order[]>([])
  const [todayOrders, setTodayOrders] = useState<Order[]>([])
  const [futureOrders, setFutureOrders] = useState<Order[]>([])
  
  // Process orders when filtered orders change
  useEffect(() => {
    const { past, today, future } = categorizeOrders(filteredOrders)
    
    setPastOrders(past)
    setTodayOrders(today)
    setFutureOrders(future)
    
    // Update allOrders if any status was changed
    const updatedAllOrders = [...past, ...today, ...future]
    if (JSON.stringify(updatedAllOrders) !== JSON.stringify(allOrders)) {
      setAllOrders(updatedAllOrders)
    }
    
    // Set up interval to check for time-based status changes every minute
    const intervalId = setInterval(() => {
      const { past, today, future } = categorizeOrders(filteredOrders)
      setPastOrders(past)
      setTodayOrders(today)
      setFutureOrders(future)
    }, 60000)
    
    return () => clearInterval(intervalId)
  }, [filteredOrders, allOrders])
  
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
    setFilteredOrders(updatedOrders)
    
    toast.success(`Order status updated to ${newStatus}`)
    console.log(`Status update completed for order ${id}`)
  }
  
  const applyFilter = (data: FilterValues) => {
    const filterCriteria = {
      searchValue: data.taskId?.toLowerCase() || '',
      status: data.status || '',
      serviceType: data.serviceType || '',
      city: data.city || '',
      providerId: data.providerId || '',
      providerPhone: data.providerPhone || ''
    }
    
    const filtered = filterOrders(allOrders, filterCriteria)
    setFilteredOrders(filtered)
  }
  
  // Extract unique cities from all orders for the city filter dropdown
  const getCities = (): string[] => {
    const citySet = new Set<string>();
    allOrders.forEach(order => {
      const city = order.city || extractCityFromLocation(order.pickupLocation);
      if (city) citySet.add(city);
    });
    return Array.from(citySet).sort();
  }

  return {
    orders: filteredOrders,
    allOrders,
    pastOrders,
    todayOrders,
    futureOrders,
    handleStatusChange,
    applyFilter,
    getCities
  }
}

// Helper function to extract city from location string
const extractCityFromLocation = (location: string): string => {
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}
