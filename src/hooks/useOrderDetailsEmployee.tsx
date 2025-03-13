
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
    setTimeout(() => {
      const mockOrder = getMockOrder(taskId);
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

  return { 
    order, 
    loading, 
    addNoteToConversation,
    addInternalNote
  };
};
