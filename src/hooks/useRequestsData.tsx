
import { useState, useEffect } from 'react';
import { Request } from '@/types/request';
import { fetchAllRequests } from '@/services/requestService';
import { toast } from 'sonner';
import { categorizeRequestsByDate } from '@/utils/dateUtils';
import { supabase } from "@/integrations/supabase/client";

export const useRequestsData = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [pastRequests, setPastRequests] = useState<Request[]>([]);
  const [todayRequests, setTodayRequests] = useState<Request[]>([]);
  const [futureRequests, setFutureRequests] = useState<Request[]>([]);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const data = await fetchAllRequests();
        setRequests(data);
        
        // Categorize requests by date
        const categorized = categorizeRequestsByDate(data);
        setPastRequests(categorized.past);
        setTodayRequests(categorized.today);
        setFutureRequests(categorized.future);
      } catch (error) {
        console.error('Error loading requests:', error);
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    loadRequests();

    // Set up realtime subscription
    const channel = supabase
      .channel('public:requests')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'requests' 
      }, () => {
        // Reload data when changes occur
        loadRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    requests,
    loading,
    pastRequests,
    todayRequests,
    futureRequests
  };
};
