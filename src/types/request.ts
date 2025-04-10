
import { Note } from '@/components/customer/order-details/tabs/ConversationTab';

export interface Request {
  id: string;
  taskId: string;
  companyName: string;
  employeeName: string;
  serviceType: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  notes?: string;
  // Add fields that were in the previous version but missing in the new one
  city?: string;
  providerId?: string;
  providerPhone?: string;
  car: {
    model: string;
    year: string;
    licensePlate: string;
    licensePlateArabic?: string;
    vin: string;
  };
  provider: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    totalOrders: number;
    vehicleInfo: {
      model: string;
      licensePlate: string;
    };
  };
  timeTracking: {
    scheduled: string;
    accepted: string;
    arrivedPickup: string | null;
    inService: string | null;
    completed: string | null;
  };
  conversation: Note[];
  // Additional fields needed by other components
  autoLaunchTime?: string | null;
  assignedAt?: string | null;
  arrivedAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
  cancellationReason?: string;
  pickupPhotos?: any[];
  dropoffPhotos?: any[];
  manualAssignment?: boolean;
  attachments?: string[];
}
