
import { useState } from 'react'
import { Activity } from '@/types/activity'
import { v4 as uuidv4 } from 'uuid'

// Mock initial activities
const initialActivities: Activity[] = [
  {
    id: uuidv4(),
    description: 'Updated order status',
    type: 'edit',
    entityType: 'Order',
    entityId: '2025-004',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    userId: 'employee-1'
  },
  {
    id: uuidv4(),
    description: 'Added note to ticket',
    type: 'ticket',
    entityType: 'Ticket',
    entityId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    userId: 'employee-1'
  },
  {
    id: uuidv4(),
    description: 'Created new request',
    type: 'request',
    entityType: 'Request',
    entityId: '2025-008',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    userId: 'employee-1'
  },
  {
    id: uuidv4(),
    description: 'Assigned provider to order',
    type: 'edit',
    entityType: 'Order',
    entityId: '2025-006',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    userId: 'employee-1'
  },
  {
    id: uuidv4(),
    description: 'Closed ticket',
    type: 'ticket',
    entityType: 'Ticket',
    entityId: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
    userId: 'employee-1'
  }
]

export const useRecentActivity = () => {
  const [recentActivities, setRecentActivities] = useState<Activity[]>(initialActivities)
  
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: uuidv4(),
    }
    
    setRecentActivities(prev => [newActivity, ...prev])
  }
  
  return {
    recentActivities,
    addActivity
  }
}
