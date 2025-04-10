
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { ApprovalsList } from '@/components/employee/admin/ApprovalsList';
import { ProviderDetailDialog } from '@/components/employee/admin/ProviderDetailDialog';
import { useAdminApprovals } from '@/hooks/useAdminApprovals';
import { PendingApproval } from '@/types/admin';

export default function ApprovalsPage() {
  const { 
    pendingApprovals, 
    loading, 
    approveProvider, 
    rejectProvider, 
    refreshApprovals 
  } = useAdminApprovals();
  
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const handleViewDetails = (providerId: string) => {
    const approval = pendingApprovals.find(a => a.provider_id === providerId);
    if (approval) {
      setSelectedApproval(approval);
      setDetailsOpen(true);
    }
  };
  
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <div className="p-6 space-y-6">
        <div className="flex items-center">
          <Shield className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Admin Approval Dashboard</h1>
        </div>
        
        <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
          <Shield className="h-4 w-4" />
          <AlertTitle>Approval Center</AlertTitle>
          <AlertDescription>
            Review and manage provider registration requests. Approved providers will be able to log in and accept service requests.
          </AlertDescription>
        </Alert>
        
        <ApprovalsList
          approvals={pendingApprovals}
          loading={loading}
          onView={handleViewDetails}
          onApprove={approveProvider}
          onReject={rejectProvider}
          onRefresh={refreshApprovals}
        />
      </div>
      
      <ProviderDetailDialog
        approval={selectedApproval}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onApprove={approveProvider}
        onReject={rejectProvider}
      />
    </Card>
  );
}
