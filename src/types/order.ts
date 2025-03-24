
export interface Note {
  id: string
  sender: 'customer' | 'employee'
  message: string
  timestamp: string
  senderName: string
}

export interface InternalNote {
  id: string
  message: string
  timestamp: string
  employeeName: string
}

export interface Order {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes?: string
  acceptedBy?: string
  declinedBy?: string[]
  pendingProviders?: string[]
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
    plateArabic?: string
    model: string
    name: string
    vin: string
    year?: string
  }
  conversation: Note[]
  internalNotes: InternalNote[]
}
