
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
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('pickup_time', { ascending: true });

  if (error) {
    console.error('Error fetching requests:', error);
    return [];
  }

  return data?.map(item => ({
    id: item.id,
    taskId: item.task_id,
    companyName: item.company_name,
    employeeName: item.employee_name,
    serviceType: item.service_type,
    pickupTime: new Date(item.pickup_time).toISOString(),
    pickupLocation: item.pickup_location,
    dropoffLocation: item.dropoff_location,
    status: item.status,
    notes: item.notes || '',
    city: item.city,
    providerId: item.provider_id,
    providerPhone: item.provider_phone,
    car: extractCarInfo(item.car),
    // Add new metadata fields
    autoLaunchTime: item.auto_launch_time ? new Date(item.auto_launch_time).toISOString() : null,
    assignedAt: item.assigned_at ? new Date(item.assigned_at).toISOString() : null,
    arrivedAt: item.arrived_at ? new Date(item.arrived_at).toISOString() : null,
    completedAt: item.completed_at ? new Date(item.completed_at).toISOString() : null,
    cancelledAt: item.cancelled_at ? new Date(item.cancelled_at).toISOString() : null,
    cancellationReason: item.cancellation_reason || '',
    pickupPhotos: item.pickup_photos || [],
    dropoffPhotos: item.dropoff_photos || [],
    manualAssignment: item.manual_assignment || false,
    attachments: Array.isArray(item.attachments) ? item.attachments : [] // Handle attachments field safely
  })) || [];
}

export async function createRequest(request: Omit<Request, 'id' | 'taskId'>): Promise<Request | null> {
  // Calculate auto_launch_time (30 minutes before pickup time)
  const pickupDate = new Date(request.pickupTime);
  const autoLaunchTime = new Date(pickupDate.getTime() - 30 * 60 * 1000);

  // Convert from camelCase to snake_case for database
  const { data, error } = await supabase
    .from('requests')
    .insert({
      company_name: request.companyName,
      employee_name: request.employeeName,
      service_type: request.serviceType,
      pickup_time: request.pickupTime,
      pickup_location: request.pickupLocation,
      dropoff_location: request.dropoffLocation,
      // Cast the status string to the enum type
      status: 'Scheduled', // Default to Scheduled for new requests
      notes: request.notes,
      city: request.city,
      provider_id: request.providerId,
      provider_phone: request.providerPhone,
      car: request.car ? {
        model: request.car.model,
        year: request.car.year,
        licensePlate: request.car.licensePlate,
        licensePlateArabic: request.car.licensePlateArabic,
        vin: request.car.vin
      } : null,
      auto_launch_time: autoLaunchTime.toISOString(),
      manual_assignment: request.manualAssignment || false,
      attachments: request.attachments || [] // Add attachments
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating request:', error);
    return null;
  }

  // Convert from snake_case back to camelCase for frontend
  if (!data) return null;
  
  return {
    id: data.id,
    taskId: data.task_id,
    companyName: data.company_name,
    employeeName: data.employee_name,
    serviceType: data.service_type,
    pickupTime: new Date(data.pickup_time).toISOString(),
    pickupLocation: data.pickup_location,
    dropoffLocation: data.dropoff_location,
    status: data.status,
    notes: data.notes || '',
    city: data.city,
    providerId: data.provider_id,
    providerPhone: data.provider_phone,
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
    attachments: Array.isArray(data.attachments) ? data.attachments : [] // Include attachments in response
  };
}

export async function updateRequestStatus(id: string, status: string, metadata: Partial<Request> = {}): Promise<boolean> {
  // Prepare data update object with status
  const updateData: any = { status };
  
  // Add timestamp based on status
  switch (status) {
    case 'Waiting for Provider':
      updateData.auto_launch_time = new Date().toISOString();
      break;
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
  
  // Add photos if provided
  if (metadata.pickupPhotos?.length) {
    updateData.pickup_photos = metadata.pickupPhotos;
  }
  if (metadata.dropoffPhotos?.length) {
    updateData.dropoff_photos = metadata.dropoffPhotos;
  }

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
  return updateRequestStatus(id, 'Cancelled', { cancellationReason: reason });
}
