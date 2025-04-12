
import { useState, useEffect } from 'react';
import { Order, Note, InternalNote, ActionLogEntry } from '@/types/order';
import { getMockOrder } from '@/services/mockOrderService';
import { v4 as uuidv4 } from 'uuid';

export * from '@/types/order';

export const useOrderDetailsEmployee = (taskId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Loading order details for taskId:", taskId);
    
    setTimeout(() => {
      const mockOrder = getMockOrder(taskId);
      
      // Add special cases for testing different statuses
      if (taskId === '2023-009') {
        mockOrder.status = 'Scheduled';
      } else if (taskId === '2025-002') {
        mockOrder.status = 'Waiting for Provider';
      } else if (taskId === '2025-006') {
        // Add a test case for the current route
        mockOrder.status = 'NPA';
      }
      
      console.log("Loaded order with status:", mockOrder.status);
      setOrder(mockOrder);
      setLoading(false);
    }, 500);
  }, [taskId]);

  const addNoteToConversation = (message: string) => {
    if (!order) return;
    
    const note: Note = {
      id: uuidv4(),
      sender: 'employee',
      message,
      timestamp: new Date().toISOString(),
      senderName: 'Admin User'
    };
    
    const updatedOrder = {
      ...order,
      conversation: [...order.conversation, note]
    };
    
    // Also add to action log
    const actionLog = order.actionLog || [];
    const actionEntry: ActionLogEntry = {
      id: uuidv4(),
      action: 'Note Added',
      timestamp: new Date().toISOString(),
      performedBy: 'Admin User',
      details: `External note: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`
    };
    
    updatedOrder.actionLog = [...actionLog, actionEntry];
    
    setOrder(updatedOrder);
  };

  const addInternalNote = (message: string) => {
    if (!order) return;
    
    const note: InternalNote = {
      id: uuidv4(),
      message,
      timestamp: new Date().toISOString(),
      employeeName: 'Admin User'
    };
    
    const updatedOrder = {
      ...order,
      internalNotes: [...order.internalNotes, note]
    };
    
    // Also add to action log
    const actionLog = order.actionLog || [];
    const actionEntry: ActionLogEntry = {
      id: uuidv4(),
      action: 'Internal Note Added',
      timestamp: new Date().toISOString(),
      performedBy: 'Admin User',
      details: `Internal note: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`
    };
    
    updatedOrder.actionLog = [...actionLog, actionEntry];
    
    setOrder(updatedOrder);
  };

  const updateOrderStatus = (newStatus: string, reason?: string) => {
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
      case 'In Route':
        updatedTimeTracking.inRouteAt = now;
        break;
      case 'Arrived at Pickup Location':
        updatedTimeTracking.arrivedAt = now;
        break;
      case 'In Service':
        updatedTimeTracking.inServiceAt = now;
        break;
      case 'Complete':
        updatedTimeTracking.dropoffAt = now;
        break;
    }
    
    updatedOrder.timeTracking = updatedTimeTracking;
    
    // Add to action log
    const actionLog = order.actionLog || [];
    const actionEntry: ActionLogEntry = {
      id: uuidv4(),
      action: `Status Changed to ${newStatus}`,
      timestamp: now,
      performedBy: 'Admin User',
      details: reason ? `Reason: ${reason}` : undefined
    };
    
    updatedOrder.actionLog = [...actionLog, actionEntry];
    
    setOrder(updatedOrder);
  };
  
  const researchProviders = () => {
    if (!order) return;
    
    // In a real app, this would trigger an API call to search for providers
    // For now, we just update the action log
    const now = new Date().toISOString();
    const actionLog = order.actionLog || [];
    const actionEntry: ActionLogEntry = {
      id: uuidv4(),
      action: 'Provider Research Initiated',
      timestamp: now,
      performedBy: 'Admin User',
      details: 'Searching for providers within 7km of pickup location'
    };
    
    const updatedOrder = {
      ...order,
      actionLog: [...actionLog, actionEntry]
    };
    
    setOrder(updatedOrder);
    
    // Simulate a provider being found after a delay
    setTimeout(() => {
      if (!order) return;
      
      const actionLog = order.actionLog || [];
      const actionEntry: ActionLogEntry = {
        id: uuidv4(),
        action: 'Providers Found',
        timestamp: new Date().toISOString(),
        performedBy: 'System',
        details: '3 providers found within range'
      };
      
      const updatedOrder = {
        ...order,
        actionLog: [...actionLog, actionEntry],
        pendingProviders: ['Provider A', 'Provider B', 'Provider C']
      };
      
      setOrder(updatedOrder);
    }, 2000);
  };
  
  const reassignProvider = (providerId: string) => {
    if (!order) return;
    
    // In a real app, this would make an API call to assign the provider
    // For now, we just update the local state
    const now = new Date().toISOString();
    
    // Add to action log
    const actionLog = order.actionLog || [];
    const actionEntry: ActionLogEntry = {
      id: uuidv4(),
      action: 'Manual Provider Assignment',
      timestamp: now,
      performedBy: 'Admin User',
      details: `Order manually assigned to provider ${providerId}`
    };
    
    const updatedOrder = {
      ...order,
      actionLog: [...actionLog, actionEntry],
      status: 'Waiting for Provider',
      acceptedBy: undefined,
      pendingProviders: [providerId]
    };
    
    setOrder(updatedOrder);
    
    // Simulate provider accepting after a delay
    setTimeout(() => {
      if (!order) return;
      
      const actionLog = updatedOrder.actionLog || [];
      const actionEntry: ActionLogEntry = {
        id: uuidv4(),
        action: 'Provider Accepted Order',
        timestamp: new Date().toISOString(),
        performedBy: 'System',
        details: `Provider ${providerId} has accepted the order`
      };
      
      const acceptedOrder = {
        ...updatedOrder,
        actionLog: [...actionLog, actionEntry],
        status: 'In Route',
        acceptedBy: `Provider ${providerId}`,
        pendingProviders: []
      };
      
      setOrder(acceptedOrder);
    }, 3000);
  };

  return { 
    order, 
    loading, 
    addNoteToConversation,
    addInternalNote,
    updateOrderStatus,
    researchProviders,
    reassignProvider
  };
};
