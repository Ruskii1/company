
import { supabase } from "@/integrations/supabase/client";
import { Request } from "@/types/request";
import { mapToRequest } from "../mappers/requestMapper";

/**
 * Fetches all requests from the database
 */
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

  return data?.map(mapToRequest) || [];
}
