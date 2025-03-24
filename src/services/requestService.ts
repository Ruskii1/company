
import { supabase } from "@/integrations/supabase/client";
import { Request } from "@/types/request";

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
    car: item.car ? {
      model: typeof item.car === 'object' && item.car !== null ? (item.car.model || '') : '',
      year: typeof item.car === 'object' && item.car !== null ? (item.car.year || '') : '',
      licensePlate: typeof item.car === 'object' && item.car !== null ? (item.car.licensePlate || '') : '',
      licensePlateArabic: typeof item.car === 'object' && item.car !== null ? (item.car.licensePlateArabic || '') : '',
      vin: typeof item.car === 'object' && item.car !== null ? (item.car.vin || '') : ''
    } : undefined
  })) || [];
}

export async function createRequest(request: Omit<Request, 'id' | 'taskId'>): Promise<Request | null> {
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
      status: request.status,
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
      } : null
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
    car: data.car ? {
      model: typeof data.car === 'object' && data.car !== null ? (data.car.model || '') : '',
      year: typeof data.car === 'object' && data.car !== null ? (data.car.year || '') : '',
      licensePlate: typeof data.car === 'object' && data.car !== null ? (data.car.licensePlate || '') : '',
      licensePlateArabic: typeof data.car === 'object' && data.car !== null ? (data.car.licensePlateArabic || '') : '',
      vin: typeof data.car === 'object' && data.car !== null ? (data.car.vin || '') : ''
    } : undefined
  };
}

export async function updateRequestStatus(id: string, status: string): Promise<boolean> {
  const { error } = await supabase
    .from('requests')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating request status:', error);
    return false;
  }

  return true;
}
