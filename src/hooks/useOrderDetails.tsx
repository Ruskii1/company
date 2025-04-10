
import { useState, useEffect } from 'react';
import { Request } from '@/types/request';
import { toast } from 'sonner';
import { Note } from '@/components/customer/order-details/tabs/ConversationTab';

export const useOrderDetails = (taskId?: string) => {
  const [order, setOrder] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for the order
        const mockOrder: Request = {
          id: taskId || '',
          taskId: taskId || '',
          companyName: 'Tech Solutions Inc.',
          employeeName: 'John Smith',
          serviceType: 'Regular Towing',
          pickupTime: new Date().toISOString(),
          pickupLocation: '123 Main St, Riyadh',
          dropoffLocation: '456 Market St, Riyadh',
          status: 'Scheduled',
          notes: 'Vehicle has flat tire',
          car: {
            model: 'Toyota Camry',
            year: '2021',
            licensePlate: '123ABC',
            licensePlateArabic: '١٢٣أبج',
            vin: 'ABCD1234567890123'
          },
          provider: {
            id: 'PRV-001',
            name: 'Quick Towing Services',
            phone: '+966-123-456-7890',
            rating: 4.8,
            totalOrders: 156,
            vehicleInfo: {
              model: 'Tow Truck 3000',
              licensePlate: '789XYZ'
            }
          },
          timeTracking: {
            scheduled: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            accepted: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            arrivedPickup: null,
            inService: null,
            completed: null
          },
          conversation: [
            {
              id: '1',
              sender: 'system',
              message: 'Order created and awaiting provider',
              timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
            },
            {
              id: '2',
              sender: 'provider',
              message: 'I am on my way to your location',
              timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
            }
          ] as Note[]
        };
        
        setOrder(mockOrder);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [taskId]);

  const addNoteToConversation = (note: string) => {
    if (!order) return;
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      sender: 'customer',
      message: note,
      timestamp: new Date().toISOString()
    };
    
    setOrder(prev => {
      if (!prev) return null;
      
      const updatedConversation = [
        ...(prev.conversation || []),
        newNote
      ];
      
      return {
        ...prev,
        conversation: updatedConversation
      };
    });
    
    toast.success('Note added successfully');
  };

  const updateOrderStatus = async (newStatus: string) => {
    if (!order) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrder(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: newStatus
        };
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
      throw error;
    }
  };

  return {
    order,
    loading,
    addNoteToConversation,
    updateOrderStatus
  };
};
