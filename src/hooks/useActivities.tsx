
import { useState } from 'react'
import { Activity } from '@/types/activity'
import { v4 as uuidv4 } from 'uuid'

// Initial mock data for activities
const initialActivities: Activity[] = [
  {
    id: uuidv4(),
    type: "request",
    description: "New request created by TechCorp LLC",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    entityType: "Request",
    entityId: "2025-001",
    userId: "emp-001"
  },
  {
    id: uuidv4(),
    type: "edit",
    description: "Provider assigned to GlobalTrade Inc. request",
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
    entityType: "Order",
    entityId: "2025-002",
    userId: "emp-002"
  },
  {
    id: uuidv4(),
    type: "edit",
    description: "Request for SmartSolutions SA marked as completed",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    entityType: "Order",
    entityId: "2025-003",
    userId: "emp-001"
  },
  {
    id: uuidv4(),
    type: "ticket",
    description: "New support ticket opened by InnovateX Ltd",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    entityType: "Ticket",
    entityId: "ticket#0001",
    userId: "emp-003"
  },
  {
    id: uuidv4(),
    type: "ticket",
    description: "Support ticket for QualityServices LLC resolved",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    entityType: "Ticket",
    entityId: "ticket#0002",
    userId: "emp-001"
  }
];

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: uuidv4(),
    };
    
    setActivities(prev => [newActivity, ...prev]);
  };

  const removeActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };
  
  return {
    activities,
    addActivity,
    removeActivity
  };
}
