
import { OrderStatus } from "@/types/orderStatus";

/**
 * Determines if an order can be cancelled based on its status and scheduled time
 * @param status Current order status
 * @param pickupTime Scheduled pickup time
 * @param isEmployee Whether the user is an employee
 * @param isAdmin Whether the user is an admin
 * @returns Object containing whether cancellation is allowed and a reason if not
 */
export const canCancelOrder = (
  status: OrderStatus,
  pickupTime: string,
  isEmployee: boolean = false,
  isAdmin: boolean = false
): { allowed: boolean; reason?: string } => {
  // Admin can cancel orders in any status except Complete and Cancelled
  if (isAdmin) {
    if (status === 'Complete') {
      return { allowed: false, reason: 'Completed orders cannot be cancelled' };
    }
    if (status === 'Cancelled') {
      return { allowed: false, reason: 'Order is already cancelled' };
    }
    return { allowed: true };
  }

  // Employees can cancel orders in Waiting for Provider status and other statuses
  if (isEmployee) {
    if (status === 'Complete') {
      return { allowed: false, reason: 'Completed orders cannot be cancelled' };
    }
    if (status === 'Cancelled') {
      return { allowed: false, reason: 'Order is already cancelled' };
    }
    return { allowed: true };
  }

  // Regular users (customers) can only cancel in Scheduled status
  // and only if it's more than 5 minutes before pickup time
  if (status === 'Scheduled') {
    const pickupDateTime = new Date(pickupTime);
    const now = new Date();
    const fiveMinutesBeforePickup = new Date(pickupDateTime.getTime() - 5 * 60 * 1000);
    
    if (now >= fiveMinutesBeforePickup) {
      return { 
        allowed: false, 
        reason: 'Orders cannot be cancelled within 5 minutes of scheduled time' 
      };
    }
    
    return { allowed: true };
  }
  
  // For all other statuses, customers cannot cancel
  return { 
    allowed: false, 
    reason: 'Orders in this status can only be cancelled by service staff' 
  };
};

/**
 * Determines if an order status should auto-transition to Waiting for Provider
 * @param status Current order status
 * @param pickupTime Scheduled pickup time
 * @returns Whether the status should transition
 */
export const shouldTransitionToWaitingForProvider = (
  status: OrderStatus,
  pickupTime: string
): boolean => {
  if (status !== 'Scheduled') return false;
  
  const pickupDateTime = new Date(pickupTime);
  const now = new Date();
  
  // If we've reached or passed the scheduled time, transition to Waiting for Provider
  return now >= pickupDateTime;
};
