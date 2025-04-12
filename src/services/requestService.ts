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
  // Use the new Orders table
  const { data, error } = await supabase
    .from('Orders')
    .select('*')
    .order('requested_pickup_time', { ascending: true });

  if (error) {
    console.error('Error fetching requests:', error);
    return [];
  }

  return data?.map(item => {
    // Map the new table fields to our Request interface
    return {
      id: item.order_id,
      taskId: item.order_id, // Using order_id as taskId
      companyName: item.corporate_name || '',
      employeeName: item.customer_name || '',
      serviceType: item.service_type,
      pickupTime: new Date(item.requested_pickup_time).toISOString(),
      pickupLocation: item.pickup_location,
      dropoffLocation: item.dropoff_location,
      status: item.status,
      notes: item.notes_customer || '',
      city: extractCityFromLocation(item.pickup_location),
      providerId: item.provider_id,
      providerPhone: '',  // Will need to join with Users table to get this
      car: { // We'll need to join with Vehicles table to get this info in the future
        model: '',
        year: '',
        licensePlate: '',
        licensePlateArabic: '',
        vin: ''
      },
      // Map timestamps to our interface
      autoLaunchTime: null,
      assignedAt: item.provider_accept_time ? new Date(item.provider_accept_time).toISOString() : null,
      arrivedAt: item.arrival_at_pickup_time ? new Date(item.arrival_at_pickup_time).toISOString() : null,
      completedAt: item.dropoff_time ? new Date(item.dropoff_time).toISOString() : null,
      cancelledAt: null, // No direct field in new schema
      cancellationReason: '',
      pickupPhotos: [], // Need to join with Order_Photos
      dropoffPhotos: [], // Need to join with Order_Photos
      manualAssignment: false,
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
        acceptedAt: item.provider_accept_time ? new Date(item.provider_accept_time).toISOString() : '',
        inRouteAt: item.in_route_time ? new Date(item.in_route_time).toISOString() : '',
        arrivedAt: item.arrival_at_pickup_time ? new Date(item.arrival_at_pickup_time).toISOString() : '',
        inServiceAt: item.service_start_time ? new Date(item.service_start_time).toISOString() : '',
        dropoffAt: item.dropoff_time ? new Date(item.dropoff_time).toISOString() : ''
      },
      conversation: []
    }
  }) || [];
}

// Helper function to extract city from location string
function extractCityFromLocation(location: string): string {
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}

export async function createRequest(request: Omit<Request, 'id' | 'taskId'>): Promise<Request | null> {
  // Generate an order ID (you might want to implement a more sophisticated ID generation)
  const orderId = `ORD-${Date.now()}`;
  
  // First, we need to check if the customer exists
  // This is a simplified implementation - in a real app, you'd need proper customer management
  const customerExists = false; // Placeholder for now
  
  if (!customerExists) {
    console.error('Customer does not exist. Please create customer first.');
    return null;
  }
  
  // Insert into Orders table
  const { data, error } = await supabase
    .from('Orders')
    .insert({
      order_id: orderId,
      service_type: request.serviceType,
      requested_pickup_time: request.pickupTime,
      pickup_location: request.pickupLocation,
      dropoff_location: request.dropoffLocation,
      status: 'Scheduled', // Default status for new orders
      notes_customer: request.notes,
      // Other fields would be populated later
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
    id: data.order_id,
    taskId: data.order_id,
    companyName: request.companyName,
    employeeName: request.employeeName,
    serviceType: data.service_type,
    pickupTime: new Date(data.requested_pickup_time).toISOString(),
    pickupLocation: data.pickup_location,
    dropoffLocation: data.dropoff_location,
    status: data.status,
    notes: data.notes_customer || '',
    city: request.city,
    providerId: request.providerId,
    providerPhone: request.providerPhone,
    car: request.car,
    autoLaunchTime: null,
    assignedAt: null,
    arrivedAt: null,
    completedAt: null,
    cancelledAt: null,
    cancellationReason: '',
    pickupPhotos: [],
    dropoffPhotos: [],
    manualAssignment: request.manualAssignment || false,
    attachments: request.attachments || [],
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
      acceptedAt: '',
      inRouteAt: '',
      arrivedAt: '',
      inServiceAt: '',
      dropoffAt: ''
    },
    conversation: []
  };
}

export async function updateRequestStatus(id: string, status: string, metadata: Partial<Request> = {}): Promise<boolean> {
  // Map our application status to the database order_status enum
  let dbStatus: string;
  switch (status) {
    case 'Waiting for Provider':
      dbStatus = 'Waiting for Provider';
      break;
    case 'In Route':
      dbStatus = 'In Route';
      break;
    case 'Arrived at Pickup Location':
      dbStatus = 'Arrived';
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
      updateData.in_route_time = new Date().toISOString();
      break;
    case 'Arrived at Pickup Location':
      updateData.arrival_at_pickup_time = new Date().toISOString();
      break;
    case 'In Service':
      updateData.service_start_time = new Date().toISOString();
      break;
    case 'Complete':
      updateData.dropoff_time = new Date().toISOString();
      break;
  }
  
  // For cancelled orders, we would need to store the cancellation reason elsewhere
  // as there's no direct field in the new schema
  
  // Update the order in the Orders table
  const { error } = await supabase
    .from('Orders')
    .update(updateData)
    .eq('order_id', id);

  if (error) {
    console.error('Error updating request status:', error);
    return false;
  }

  return true;
}

export async function cancelRequest(id: string, reason: string): Promise<boolean> {
  // For cancelled orders, we can store the reason in provider_notes or create a separate table
  return updateRequestStatus(id, 'Cancelled', { cancellationReason: reason });
}
