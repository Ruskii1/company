
import { Json } from "@/integrations/supabase/types";
import { Request } from "@/types/request";
import { extractCarInfo, extractCityFromLocation, createDefaultProvider, createDefaultTimeTracking } from "../utils/requestUtils";

/**
 * Maps data from Supabase 'requests' table to our Request interface
 */
export function mapToRequest(item: any): Request {
  return {
    id: item.id,
    taskId: item.task_id || item.id, // Fallback to id if task_id is not available
    companyName: item.company_name || '',
    employeeName: item.employee_name || '',
    serviceType: item.service_type,
    pickupTime: item.pickup_time ? new Date(item.pickup_time).toISOString() : '',
    pickupLocation: item.pickup_location,
    dropoffLocation: item.dropoff_location,
    status: item.status,
    notes: item.notes || '',
    city: item.city || extractCityFromLocation(item.pickup_location),
    providerId: item.provider_id,
    providerPhone: item.provider_phone || '',  
    car: extractCarInfo(item.car),
    // Map timestamps to our interface
    autoLaunchTime: item.auto_launch_time ? new Date(item.auto_launch_time).toISOString() : null,
    assignedAt: item.assigned_at ? new Date(item.assigned_at).toISOString() : null,
    arrivedAt: item.arrived_at ? new Date(item.arrived_at).toISOString() : null,
    completedAt: item.completed_at ? new Date(item.completed_at).toISOString() : null,
    cancelledAt: item.cancelled_at ? new Date(item.cancelled_at).toISOString() : null,
    cancellationReason: item.cancellation_reason || '',
    pickupPhotos: item.pickup_photos || [], 
    dropoffPhotos: item.dropoff_photos || [], 
    manualAssignment: item.manual_assignment || false,
    attachments: [],
    // Required fields with placeholder values
    provider: createDefaultProvider(),
    timeTracking: {
      acceptedAt: item.assigned_at ? new Date(item.assigned_at).toISOString() : '',
      inRouteAt: '', // Not available in the current schema
      arrivedAt: item.arrived_at ? new Date(item.arrived_at).toISOString() : '',
      inServiceAt: '', // Not available in the current schema
      dropoffAt: item.completed_at ? new Date(item.completed_at).toISOString() : ''
    },
    conversation: []
  };
}

/**
 * Prepares a request object for inserting into the 'requests' table
 */
export function prepareRequestForInsert(request: Omit<Request, 'id' | 'taskId'>): {
  task_id: string; 
  service_type: string;
  pickup_time: string;
  pickup_location: string;
  dropoff_location: string;
  status: string;
  notes?: string;
  company_name?: string;
  employee_name?: string;
  car?: Json;
  provider_id?: string;
  provider_phone?: string;
  city?: string;
  manual_assignment?: boolean;
} {
  return {
    task_id: `TID-${Date.now()}`, // Generate a task ID
    service_type: request.serviceType,
    pickup_time: request.pickupTime,
    pickup_location: request.pickupLocation,
    dropoff_location: request.dropoffLocation,
    status: 'Scheduled', // Default status for new requests
    notes: request.notes,
    company_name: request.companyName,
    employee_name: request.employeeName,
    car: request.car,
    provider_id: request.providerId,
    provider_phone: request.providerPhone,
    city: request.city || extractCityFromLocation(request.pickupLocation),
    manual_assignment: request.manualAssignment
  };
}
