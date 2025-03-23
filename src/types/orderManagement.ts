
export interface Order {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  city?: string
  providerId?: string
  providerPhone?: string
}

export interface FilterValues {
  taskId?: string
  serviceType?: string
  status?: string
  city?: string
  providerId?: string
  providerPhone?: string
}
