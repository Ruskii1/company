
import { Note, Order, InternalNote } from '@/types/order';
import { useToast } from '@/hooks/use-toast';

export const useConversationUtils = () => {
  const { toast } = useToast();
  
  const addNoteToConversation = (order: Order | null, message: string): Order | null => {
    if (!order) return null;

    const newNoteObj: Note = {
      id: Date.now().toString(),
      sender: 'employee',
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
      senderName: 'Support Team'
    };

    const updatedOrder = {
      ...order,
      conversation: [...order.conversation, newNoteObj]
    };
    
    toast({
      title: "Note sent",
      description: "Your message has been added to the conversation",
    });
    
    return updatedOrder;
  };

  const addInternalNote = (order: Order | null, message: string): Order | null => {
    if (!order) return null;

    const newInternalNoteObj: InternalNote = {
      id: Date.now().toString(),
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
      employeeName: 'Current Employee'
    };

    const updatedOrder = {
      ...order,
      internalNotes: [...order.internalNotes, newInternalNoteObj]
    };
    
    toast({
      title: "Internal note saved",
      description: "Your note has been added to the order",
    });
    
    return updatedOrder;
  };

  return {
    addNoteToConversation,
    addInternalNote
  };
};
