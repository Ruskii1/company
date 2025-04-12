
import { supabase } from "@/integrations/supabase/client";
import { Request } from "@/types/request";
import { Json } from "@/integrations/supabase/types";

// Helper function to safely extract car data
function extractCarInfo(carData: Json | null): Request['car'] | undefined {
  if (!carData || typeof carData !== 'object' || Array.isArray(carData)) {
    return undefined;
  }
  
  const car = carData as Record<string, Json>;
  
  return {
    model: typeof car.model === 'string' ? car.model : '',
    year: typeof car.year === 'string' ? car.year : '',
    licensePlate: typeof car.licensePlate === 'string' ? car.licensePlate : '',
    licensePlateArabic: typeof car.licensePlateArabic === 'string' ? car.licensePlateArabic : '',
    vin: typeof car.vin === 'string' ? car.vin : ''
  };
}

export async function fetchAllRequests(): Promise<Request[]> {
  // Use the existing requests table
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('pickup_time', { ascending: true });

  if (error) {
    console.error('Error fetching requests:', error);
    return [];
  }

  return data?.map(item => {
    // Map the existing table fields to our Request interface
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
      provider: {
        name: '',
        phone: '',
        rating: 0,
        corporationName: '',
        images: {
          pickup: [],
          dropoff: []
        },
        location: {
          lat: 0,
          lng: 0
        }
      },
      timeTracking: {
        acceptedAt: item.assigned_at ? new Date(item.assigned_at).toISOString() : '',
        inRouteAt: '', // Not available in the current schema
        arrivedAt: item.arrived_at ? new Date(item.arrived_at).toISOString() : '',
        inServiceAt: '', // Not available in the current schema
        dropoffAt: item.completed_at ? new Date(item.completed_at).toISOString() : ''
      },
      conversation: []
    }
  }) || [];
}

// Helper function to extract city from location string
function extractCityFromLocation(location: string): string {
  if (!location) return '';
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}

export async function createRequest(request: Omit<Request, 'id' | 'taskId'>): Promise<Request | null> {
  // Generate a task ID (you might want to implement a more sophisticated ID generation)
  const taskId = `TID-${Date.now()}`;
  
  // Insert into requests table
  const { data, error } = await supabase
    .from('requests')
    .insert({
      task_id: taskId,
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
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating request:', error);
    return null;
  }

  // Return the newly created request
  if (!data) return null;
  
  return {
    id: data.id,
    taskId: data.task_id || data.id,
    companyName: data.company_name || '',
    employeeName: data.employee_name || '',
    serviceType: data.service_type,
    pickupTime: data.pickup_time ? new Date(data.pickup_time).toISOString() : '',
    pickupLocation: data.pickup_location,
    dropoffLocation: data.dropoff_location,
    status: data.status,
    notes: data.notes || '',
    city: data.city || extractCityFromLocation(data.pickup_location),
    providerId: data.provider_id,
    providerPhone: data.provider_phone || '',
    car: extractCarInfo(data.car),
    autoLaunchTime: data.auto_launch_time ? new Date(data.auto_launch_time).toISOString() : null,
    assignedAt: data.assigned_at ? new Date(data.assigned_at).toISOString() : null,
    arrivedAt: data.arrived_at ? new Date(data.arrived_at).toISOString() : null,
    completedAt: data.completed_at ? new Date(data.completed_at).toISOString() : null,
    cancelledAt: data.cancelled_at ? new Date(data.cancelled_at).toISOString() : null,
    cancellationReason: data.cancellation_reason || '',
    pickupPhotos: data.pickup_photos || [],
    dropoffPhotos: data.dropoff_photos || [],
    manualAssignment: data.manual_assignment || false,
    attachments: [],
    provider: {
      name: '',
      phone: '',
      rating: 0,
      corporationName: '',
      images: {
        pickup: [],
        dropoff: []
      },
      location: {
        lat: 0,
        lng: 0
      }
    },
    timeTracking: {
      acceptedAt: data.assigned_at ? new Date(data.assigned_at).toISOString() : '',
      inRouteAt: '',
      arrivedAt: data.arrived_at ? new Date(data.arrived_at).toISOString() : '',
      inServiceAt: '',
      dropoffAt: data.completed_at ? new Date(data.completed_at).toISOString() : ''
    },
    conversation: []
  };
}

export async function updateRequestStatus(id: string, status: string, metadata: Partial<Request> = {}): Promise<boolean> {
  // Map our application status to the database request_status enum
  let dbStatus: string;
  switch (status) {
    case 'Waiting for Provider':
      dbStatus = 'Waiting for Provider';
      break;
    case 'In Route':
      dbStatus = 'In Route';
      break;
    case 'Arrived at Pickup Location':
      dbStatus = 'Arrived at Pickup Location';
      break;
    case 'Complete':
      dbStatus = 'Complete';
      break;
    case 'Cancelled':
      dbStatus = 'Cancelled';
      break;
    default:
      dbStatus = status;
  }
  
  // Prepare data update object
  const updateData: any = { status: dbStatus };
  
  // Add timestamp based on status
  switch (status) {
    case 'In Route':
      updateData.assigned_at = new Date().toISOString();
      break;
    case 'Arrived at Pickup Location':
      updateData.arrived_at = new Date().toISOString();
      break;
    case 'Complete':
      updateData.completed_at = new Date().toISOString();
      break;
    case 'Cancelled':
      updateData.cancelled_at = new Date().toISOString();
      updateData.cancellation_reason = metadata.cancellationReason || '';
      break;
  }
  
  // Update the request in the requests table
  const { error } = await supabase
    .from('requests')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating request status:', error);
    return false;
  }

  return true;
}

export async function cancelRequest(id: string, reason: string): Promise<boolean> {
  // Update the request with cancelled status and reason
  const { error } = await supabase
    .from('requests')
    .update({ 
      status: 'Cancelled',
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason
    })
    .eq('id', id);

  if (error) {
    console.error('Error cancelling request:', error);
    return false;
  }

  return true;
}
