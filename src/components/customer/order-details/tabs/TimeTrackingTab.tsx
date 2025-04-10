
import { TimeTrackingComponent } from '@/components/customer/TimeTrackingComponent'

interface TimeTrackingTabProps {
  pickupTime: string
  timeTracking?: {
    scheduled: string
    accepted: string
    arrivedPickup: string | null
    inService: string | null
    completed: string | null
  }
}

export const TimeTrackingTab = ({ pickupTime, timeTracking }: TimeTrackingTabProps) => {
  // Create default timeTracking if it doesn't exist
  const formattedTimeTracking = timeTracking || {
    scheduled: pickupTime,
    accepted: '',
    arrivedPickup: null,
    inService: null,
    completed: null
  }
  
  return (
    <TimeTrackingComponent 
      pickupTime={pickupTime} 
      timeTracking={formattedTimeTracking} 
    />
  )
}
