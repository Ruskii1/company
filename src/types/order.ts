
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

export interface ActionLogEntry {
  id: string
  action: string
  timestamp: string
  performedBy: string
  details?: string
}

export interface Document {
  id: string
  name: string
  url: string
  type: string
  uploadedAt: string
  uploadedBy: string
}

export interface Order {
  id: string
  taskId: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  customerCompany?: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes?: string
  acceptedBy?: string
  declinedBy?: string[]
  pendingProviders?: string[]
  createdAt?: string
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
  actionLog?: ActionLogEntry[]
  documents?: Document[]
}
