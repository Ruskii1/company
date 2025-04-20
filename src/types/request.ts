
import { OrderStatus } from "./orderStatus";
import { ServiceType } from "./serviceType";

export interface Request {
  id: string
  taskId: string
  companyName?: string
  employeeName?: string
  serviceType: ServiceType
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: OrderStatus
  notes: string
  city?: string
  providerId?: string
  providerPhone?: string
  car?: {
    model: string
    year: string
    licensePlate: string
    licensePlateArabic?: string
    vin: string
  }
  // New fields for enhanced request tracking
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
  
  // Required properties that were missing in implementations
  provider?: {
    name: string
    phone: string
    rating: number
    corporationName?: string
    images?: {
      pickup: string[]
      dropoff: string[]
    }
    location?: {
      lat: number
      lng: number
    }
  }
  timeTracking?: {
    acceptedAt?: string
    inRouteAt?: string
    arrivedAt?: string
    inServiceAt?: string
    dropoffAt?: string
  }
  conversation?: any[]
}
