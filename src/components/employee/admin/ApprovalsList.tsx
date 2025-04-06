
import React, { useState } from 'react';
import { ApprovalCard } from './ApprovalCard';
import { PendingApproval } from '@/types/admin';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ApprovalsListProps {
  approvals: PendingApproval[];
  loading: boolean;
  onView: (providerId: string) => void;
  onApprove: (providerId: string) => void;
  onReject: (providerId: string) => void;
  onRefresh: () => void;
}

export function ApprovalsList({ 
  approvals, 
  loading, 
  onView, 
  onApprove, 
  onReject,
  onRefresh
}: ApprovalsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | 'all'>('all');
  
  const filteredApprovals = approvals.filter(approval => {
    // Apply text search filter
    const matchesSearch = searchQuery === '' || 
      (approval.provider?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       approval.provider?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
       approval.provider?.phoneNumber.includes(searchQuery));
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || approval.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const statusCounts = {
    all: approvals.length,
    pending: approvals.filter(a => a.status === 'pending').length,
    approved: approvals.filter(a => a.status === 'approved').length,
    rejected: approvals.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={loading}
            className="gap-1"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter size={16} />
                Status
                {statusFilter !== 'all' && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    1
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter as any}>
                <DropdownMenuRadioItem value="all">
                  All ({statusCounts.all})
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">
                  Pending ({statusCounts.pending})
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="approved">
                  Approved ({statusCounts.approved})
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rejected">
                  Rejected ({statusCounts.rejected})
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <p className="text-muted-foreground">Loading approvals...</p>
        </div>
      ) : filteredApprovals.length === 0 ? (
        <div className="border rounded-md p-8 text-center">
          <p className="text-muted-foreground">No approvals found</p>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-1">
              Try changing your search query
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApprovals.map((approval) => (
            <ApprovalCard
              key={approval.provider_id}
              approval={approval}
              onView={onView}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
