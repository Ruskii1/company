
/**
 * Defines all possible order/request statuses in the system
 */
export type OrderStatus = 
  | "Scheduled"
  | "Waiting for Provider"
  | "NPA"
  | "NPF"
  | "In Route"
  | "Arrived at Pickup Location"
  | "In Service"
  | "Complete"
  | "Cancelled";

/**
 * Maps our application status to the database status enum if needed
 */
export function mapStatusToDatabase(status: OrderStatus): OrderStatus {
  // Currently a direct mapping, but this allows us to change the mapping in the future if needed
  return status;
}

/**
 * Maps database status to our application status
 */
export function mapDatabaseToStatus(dbStatus: string): OrderStatus {
  // Add backwards compatibility mappings
  switch (dbStatus) {
    case 'Pending': return 'Scheduled';
    case 'Waiting for provider': return 'Waiting for Provider';
    case 'In route': return 'In Route';
    case 'Arrived at the pick-up location': return 'Arrived at Pickup Location';
    case 'In service': return 'In Service';
    case 'Completed': return 'Complete';
    default:
      // Check if it's already one of our defined statuses
      if (isValidOrderStatus(dbStatus)) {
        return dbStatus as OrderStatus;
      }
      // Default fallback
      return 'Scheduled';
  }
}

/**
 * Type guard to check if a string is a valid OrderStatus
 */
export function isValidOrderStatus(status: string): status is OrderStatus {
  return [
    "Scheduled", 
    "Waiting for Provider", 
    "NPA", 
    "NPF", 
    "In Route", 
    "Arrived at Pickup Location", 
    "In Service", 
    "Complete", 
    "Cancelled"
  ].includes(status);
}
