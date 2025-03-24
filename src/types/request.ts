
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
}
