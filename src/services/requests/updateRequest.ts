
import { supabase } from "@/integrations/supabase/client";
import { Request } from "@/types/request";

/**
 * Updates the status of a request
 */
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

/**
 * Cancels a request
 */
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
