
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PendingApproval } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useAdminApprovals = () => {
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);
      
      // Use type assertion to work around TypeScript issues with tables not in the types
      const { data, error } = await (supabase
        .from('admin_pending_approvals') as any)
        .select(`
          provider_id,
          status,
          reviewed_at,
          reviewed_by,
          providers:provider_id (
            id,
            first_name,
            second_name,
            third_name,
            email,
            phone,
            created_at
          )
        `)
        .order('status', { ascending: false });
      
      if (error) throw error;

      const formattedData: PendingApproval[] = data.map((item: any) => ({
        provider_id: item.provider_id,
        status: item.status,
        reviewed_at: item.reviewed_at,
        reviewed_by: item.reviewed_by,
        provider: item.providers ? {
          id: item.providers.id,
          fullName: `${item.providers.first_name} ${item.providers.second_name} ${item.providers.third_name || ''}`.trim(),
          email: item.providers.email,
          phoneNumber: item.providers.phone,
          documents: [], // We would fetch these separately if needed
          createdAt: item.providers.created_at
        } : undefined
      }));
      
      setPendingApprovals(formattedData);
    } catch (error: any) {
      console.error('Error fetching pending approvals:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pending approvals',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const approveProvider = async (providerId: string) => {
    try {
      setLoading(true);
      
      // Update the approval status using type assertion to work around TypeScript issues
      const { error: approvalError } = await (supabase
        .from('admin_pending_approvals') as any)
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'admin-user' // This would come from the auth context in a real app
        })
        .eq('provider_id', providerId);
      
      if (approvalError) throw approvalError;
      
      // Update the provider's approval status
      const { error: providerError } = await supabase
        .from('providers')
        .update({
          is_approved: true
        })
        .eq('id', providerId);
      
      if (providerError) throw providerError;
      
      toast({
        title: 'Provider Approved',
        description: 'The provider has been approved successfully.',
      });
      
      // Refresh the approvals list
      await fetchPendingApprovals();
      
    } catch (error: any) {
      console.error('Error approving provider:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve provider',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const rejectProvider = async (providerId: string) => {
    try {
      setLoading(true);
      
      // Update the approval status using type assertion to work around TypeScript issues
      const { error: approvalError } = await (supabase
        .from('admin_pending_approvals') as any)
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'admin-user' // This would come from the auth context in a real app
        })
        .eq('provider_id', providerId);
      
      if (approvalError) throw approvalError;
      
      toast({
        title: 'Provider Rejected',
        description: 'The provider has been rejected.',
      });
      
      // Refresh the approvals list
      await fetchPendingApprovals();
      
    } catch (error: any) {
      console.error('Error rejecting provider:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject provider',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  return {
    pendingApprovals,
    loading,
    approveProvider,
    rejectProvider,
    refreshApprovals: fetchPendingApprovals
  };
};
