
import { supabase } from "@/integrations/supabase/client";
import { Request } from "@/types/request";
import { OrderStatus, mapStatusToDatabase } from "@/types/orderStatus";
import { shouldTransitionToWaitingForProvider } from "@/utils/orderCancellationRules";

/**
 * Updates the status of a request
 */
export async function updateRequestStatus(id: string, status: OrderStatus, metadata: Partial<Request> = {}): Promise<boolean> {
  // Check if we need to auto-transition from Scheduled to Waiting for Provider
  let finalStatus = status;
  
  // Get the current request to check if auto-transition is needed
  const { data: currentRequest, error: fetchError } = await supabase
    .from('requests')
    .select('status, pickupTime')
    .eq('id', id)
    .single();
    
  if (fetchError) {
    console.error('Error fetching request for status update:', fetchError);
    return false;
  }
  
  // If the current status is Scheduled, check if it's time to auto-transition
  if (currentRequest && 
      currentRequest.status === 'Scheduled' && 
      shouldTransitionToWaitingForProvider('Scheduled', currentRequest.pickupTime)) {
    finalStatus = 'Waiting for Provider';
    console.log(`Auto-transitioning request ${id} from Scheduled to Waiting for Provider`);
  } else {
    finalStatus = status;
  }
  
  // Prepare data update object
  const updateData: any = { status: mapStatusToDatabase(finalStatus) };
  
  // Add timestamp based on status
  switch (finalStatus) {
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
  // Get the current request to check if cancellation is allowed
  const { data: currentRequest, error: fetchError } = await supabase
    .from('requests')
    .select('status, pickupTime')
    .eq('id', id)
    .single();
    
  if (fetchError) {
    console.error('Error fetching request for cancellation:', fetchError);
    return false;
  }
  
  // Update the request with cancelled status and reason
  const { error } = await supabase
    .from('requests')
    .update({ 
      status: 'Cancelled' as OrderStatus,
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
