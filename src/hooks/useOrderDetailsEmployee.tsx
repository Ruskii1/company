
import { useState, useEffect } from 'react';
import { Order } from '@/types/order';
import { getMockOrder } from '@/services/mockOrderService';
import { useConversationUtils } from '@/utils/conversationUtils';

export * from '@/types/order';

export const useOrderDetailsEmployee = (taskId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNoteToConversation: addNote, addInternalNote: addInternal } = useConversationUtils();

  useEffect(() => {
    console.log("Loading order details for taskId:", taskId);
    
    setTimeout(() => {
      const mockOrder = getMockOrder(taskId);
      
      // Add special cases for testing different statuses
      if (taskId === '2023-009') {
        mockOrder.status = 'Scheduled';
      } else if (taskId === '2025-002') {
        mockOrder.status = 'Waiting for provider';
      } else if (taskId === '2025-006') {
        // Add a test case for the current route
        mockOrder.status = 'Scheduled';
      }
      
      console.log("Loaded order with status:", mockOrder.status);
      setOrder(mockOrder);
      setLoading(false);
    }, 500);
  }, [taskId]);

  const addNoteToConversation = (message: string) => {
    const updatedOrder = addNote(order, message);
    if (updatedOrder) {
      setOrder(updatedOrder);
    }
  };

  const addInternalNote = (message: string) => {
    const updatedOrder = addInternal(order, message);
    if (updatedOrder) {
      setOrder(updatedOrder);
    }
  };

  const updateOrderStatus = (newStatus: string) => {
    if (!order) return;
    
    console.log(`Updating order status from ${order.status} to ${newStatus}`);
    
    // In a real app, this would make an API call
    // For now, we just update the local state
    const updatedOrder = {
      ...order,
      status: newStatus
    };
    
    // Update time tracking based on status change
    const now = new Date().toISOString();
    const updatedTimeTracking = { ...order.timeTracking };
    
    switch (newStatus) {
      case 'In route':
        updatedTimeTracking.inRouteAt = now;
        break;
      case 'Arrived at the pick-up location':
        updatedTimeTracking.arrivedAt = now;
        break;
      case 'In service':
        updatedTimeTracking.inServiceAt = now;
        break;
      case 'Completed':
        updatedTimeTracking.dropoffAt = now;
        break;
    }
    
    updatedOrder.timeTracking = updatedTimeTracking;
    setOrder(updatedOrder);
  };

  return { 
    order, 
    loading, 
    addNoteToConversation,
    addInternalNote,
    updateOrderStatus
  };
};
