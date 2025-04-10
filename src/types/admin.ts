
export interface PendingApproval {
  provider_id: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_at: string | null;
  reviewed_by: string | null;
  provider?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    documents: any[];
    createdAt: string;
  }
}
