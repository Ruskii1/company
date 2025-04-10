
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ApprovalStatusToggleProps {
  isApproved: boolean;
  onToggleApproval: () => void;
}

export function ApprovalStatusToggle({ isApproved, onToggleApproval }: ApprovalStatusToggleProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center">
        <Label htmlFor="approval-switch" className="mr-2">Provider Approval Status:</Label>
        <Switch 
          id="approval-switch" 
          checked={isApproved} 
          onCheckedChange={onToggleApproval}
        />
        <span className="ml-2 text-sm font-medium">
          {isApproved ? 'Approved' : 'Not Approved'}
        </span>
      </div>
      <div>
        <span className="text-sm text-muted-foreground">
          {isApproved 
            ? 'This provider can receive service requests.' 
            : 'This provider cannot receive service requests until approved.'}
        </span>
      </div>
    </div>
  );
}
