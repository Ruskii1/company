
import { Request } from "@/types/request";

/**
 * Maps a database request object to the application's Request interface
 */
export function mapToRequest(dbRequest: any): Request {
  return {
    id: dbRequest.id,
    taskId: dbRequest.task_id,
    companyName: dbRequest.company_name,
    employeeName: dbRequest.employee_name,
    serviceType: dbRequest.service_type,
    pickupTime: dbRequest.pickup_time,
    pickupLocation: dbRequest.pickup_location,
    dropoffLocation: dbRequest.dropoff_location,
    status: dbRequest.status,
    notes: dbRequest.notes,
    city: dbRequest.city,
    providerId: dbRequest.provider_id,
    providerPhone: dbRequest.provider_phone,
    car: dbRequest.car,
    autoLaunchTime: dbRequest.auto_launch_time,
    assignedAt: dbRequest.assigned_at,
    arrivedAt: dbRequest.arrived_at,
    completedAt: dbRequest.completed_at,
    cancelledAt: dbRequest.cancelled_at,
    cancellationReason: dbRequest.cancellation_reason,
    pickupPhotos: dbRequest.pickup_photos,
    dropoffPhotos: dbRequest.dropoff_photos,
    manualAssignment: dbRequest.manual_assignment,
    attachments: dbRequest.attachments,
    provider: dbRequest.provider,
    timeTracking: dbRequest.time_tracking,
    conversation: dbRequest.conversation,
  };
}

/**
 * Prepares a request object for insertion into the database
 */
export function prepareRequestForInsert(request: Partial<Request>) {
  // Generate a new taskId if not provided
  const generatedTaskId = crypto.randomUUID();
  
  // Map the request object to the database schema
  const insertData: any = {
    task_id: request.taskId || generatedTaskId,
    service_type: request.serviceType as any, // Cast to any to bypass type checking temporarily
    pickup_time: request.pickupTime,
    pickup_location: request.pickupLocation,
    dropoff_location: request.dropoffLocation,
    status: request.status,
    notes: request.notes || '',
    company_name: request.companyName,
    employee_name: request.employeeName,
    city: request.city,
    provider_id: request.providerId,
    car: request.car,
    manual_assignment: request.manualAssignment
  };

  // Return the prepared data
  return insertData;
}
