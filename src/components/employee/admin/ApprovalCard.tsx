
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Check, X, Eye, Clock, Shield, UserCheck, UserX } from 'lucide-react';
import { PendingApproval } from '@/types/admin';

interface ApprovalCardProps {
  approval: PendingApproval;
  onView: (providerId: string) => void;
  onApprove: (providerId: string) => void;
  onReject: (providerId: string) => void;
}

export function ApprovalCard({ approval, onView, onApprove, onReject }: ApprovalCardProps) {
  // Get status badge color and icon
  const getStatusBadge = () => {
    switch (approval.status) {
      case 'approved':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 gap-1">
            <UserCheck size={12} />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 gap-1">
            <UserX size={12} />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 gap-1">
            <Clock size={12} />
            Pending
          </Badge>
        );
    }
  };

  const dateText = approval.reviewed_at 
    ? `Reviewed on ${format(new Date(approval.reviewed_at), 'MMM d, yyyy')}`
    : `Registered on ${approval.provider?.createdAt ? format(new Date(approval.provider.createdAt), 'MMM d, yyyy') : 'N/A'}`;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{approval.provider?.fullName || 'Unknown Provider'}</CardTitle>
            <CardDescription>{dateText}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Email</p>
            <p>{approval.provider?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Phone</p>
            <p>{approval.provider?.phoneNumber || 'N/A'}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onView(approval.provider_id)}
          className="gap-1"
        >
          <Eye size={16} />
          View Details
        </Button>
        
        <div className="space-x-2">
          {approval.status === 'pending' && (
            <>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onReject(approval.provider_id)}
                className="gap-1"
              >
                <X size={16} />
                Reject
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => onApprove(approval.provider_id)}
                className="gap-1"
              >
                <Check size={16} />
                Approve
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
