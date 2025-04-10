
export interface Request {
  id: string
  taskId: string
  companyName?: string
  employeeName?: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes: string
  city?: string
  providerId?: string
  providerPhone?: string
  car?: {
    model: string
    year: string
    licensePlate: string
    licensePlateArabic: string
    vin: string
  }
  // Adding fields needed for OrderDetails and useOrderDetails
  provider?: {
    id: string
    name: string
    phone: string
    rating: number
    totalOrders: number
    vehicleInfo: {
      model: string
      licensePlate: string
    }
  }
  timeTracking?: {
    scheduled: string
    accepted: string
    arrivedPickup: string | null
    inService: string | null
    completed: string | null
  }
  conversation?: Array<{
    id: string
    sender: string
    message: string
    timestamp: string
  }>
  // Original fields
  autoLaunchTime?: string | null
  assignedAt?: string | null
  arrivedAt?: string | null
  completedAt?: string | null
  cancelledAt?: string | null
  cancellationReason?: string
  pickupPhotos?: any[]
  dropoffPhotos?: any[]
  manualAssignment?: boolean
  attachments?: string[]
}
