
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Check, X, Phone, Mail, Calendar, User, Shield, UserCheck, UserX } from 'lucide-react';
import { PendingApproval } from '@/types/admin';
import { Badge } from '@/components/ui/badge';

interface ProviderDetailDialogProps {
  approval: PendingApproval | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (providerId: string) => void;
  onReject: (providerId: string) => void;
}

export function ProviderDetailDialog({ 
  approval, 
  open, 
  onOpenChange, 
  onApprove, 
  onReject 
}: ProviderDetailDialogProps) {
  if (!approval) return null;

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
            <Shield size={12} />
            Pending Approval
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Provider Details</span>
            {getStatusBadge()}
          </DialogTitle>
          <DialogDescription>
            Review the provider's information before making a decision
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{approval.provider?.fullName || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{approval.provider?.phoneNumber || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{approval.provider?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Date</p>
                    <p className="font-medium">
                      {approval.provider?.createdAt 
                        ? format(new Date(approval.provider.createdAt), 'PPP') 
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents (placeholder for now) */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Documents & Verification</h3>
              <div className="text-center p-4 border border-dashed rounded">
                <p className="text-muted-foreground">
                  This provider has not uploaded any documents yet.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Approval Status History */}
          {approval.reviewed_at && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Review History</h3>
                <div className="p-4 border rounded bg-muted/30">
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Reviewed at:</span> {format(new Date(approval.reviewed_at), 'PPP')}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Reviewed by:</span> {approval.reviewed_by || 'System'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Action buttons */}
          {approval.status === 'pending' && (
            <div className="flex justify-end gap-2">
              <Button 
                variant="destructive" 
                onClick={() => {
                  onReject(approval.provider_id);
                  onOpenChange(false);
                }}
                className="gap-1"
              >
                <X className="h-4 w-4" />
                Reject Provider
              </Button>
              <Button 
                variant="default" 
                onClick={() => {
                  onApprove(approval.provider_id);
                  onOpenChange(false);
                }}
                className="gap-1"
              >
                <Check className="h-4 w-4" />
                Approve Provider
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
