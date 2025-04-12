
import { supabase } from "@/integrations/supabase/client";
import { Request } from "@/types/request";
import { mapToRequest, prepareRequestForInsert } from "../mappers/requestMapper";

/**
 * Creates a new request in the database
 */
export async function createRequest(request: Omit<Request, 'id' | 'taskId'>): Promise<Request | null> {
  // Prepare insert data
  const insertData = prepareRequestForInsert(request);
  
  // Insert into requests table
  const { data, error } = await supabase
    .from('requests')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('Error creating request:', error);
    return null;
  }

  // Return the newly created request
  if (!data) return null;
  
  return mapToRequest(data);
}
