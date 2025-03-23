
export interface Request {
  id: string
  taskId: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes: string
  city?: string
  providerId?: string
  providerPhone?: string
}
