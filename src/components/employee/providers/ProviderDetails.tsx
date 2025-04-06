
import { useState } from 'react';
import { ServiceProvider, InternalNote, BankAccount, Document as ProviderDocument } from '@/types/provider';
import { ProviderHeader } from './details/ProviderHeader';
import { DetailsTabs } from './details/DetailsTabs';
import { LocationDisplay } from './details/LocationDisplay';
import { ApprovalStatusToggle } from './details/ApprovalStatusToggle';
import { useToast } from '@/hooks/use-toast';

interface ProviderDetailsProps {
  provider: ServiceProvider;
  onBack: () => void;
  onAddNote: (providerId: string, note: InternalNote) => void;
  onAddBankAccount: (providerId: string, account: BankAccount) => void;
  onApproveProvider?: (providerId: string, isApproved: boolean) => void;
  onAddDocument?: (providerId: string, document: ProviderDocument) => void;
}

export function ProviderDetails({
  provider,
  onBack,
  onAddNote,
  onAddBankAccount,
  onApproveProvider,
  onAddDocument,
}: ProviderDetailsProps) {
  const [activeTab, setActiveTab] = useState('orders');
  const { toast } = useToast();

  const handleAddInternalNote = (text: string) => {
    const note: InternalNote = {
      id: `note-${Date.now()}`,
      text,
      createdAt: new Date().toISOString(),
      createdBy: {
        id: 'emp-1',
        name: 'Admin User',
        role: 'admin',
      },
    };
    onAddNote(provider.id, note);
  };

  const handleAddBankAccount = (account: BankAccount) => {
    onAddBankAccount(provider.id, account);
  };

  const handleToggleApproval = () => {
    if (onApproveProvider) {
      const newApprovalStatus = !provider.isApproved;
      onApproveProvider(provider.id, newApprovalStatus);
      
      toast({
        title: newApprovalStatus ? "Provider Approved" : "Provider Approval Revoked",
        description: newApprovalStatus 
          ? `${provider.fullName} has been approved and can now receive requests.` 
          : `${provider.fullName}'s approval has been revoked.`,
      });
    }
  };

  const handleDocumentUploaded = (document: ProviderDocument) => {
    const logEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'Document Added',
      performedBy: {
        id: 'emp-1',
        name: 'Admin User',
        role: 'admin',
      },
      details: `Document uploaded: ${document.type}`
    };
    
    if (onAddDocument) {
      onAddDocument(provider.id, document);
    }
    
    toast({
      title: "Document Uploaded",
      description: `The ${document.type.replace('_', ' ')} document has been uploaded and is pending verification.`,
    });
  };

  return (
    <div className="space-y-6">
      <ProviderHeader provider={provider} onBack={onBack} />
      
      <ApprovalStatusToggle 
        isApproved={provider.isApproved} 
        onToggleApproval={handleToggleApproval} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DetailsTabs
            provider={provider}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAddNote={handleAddInternalNote}
            onAddBankAccount={handleAddBankAccount}
            onDocumentUploaded={handleDocumentUploaded}
          />
        </div>
        
        <div>
          {activeTab !== 'location' && (
            <LocationDisplay 
              providerId={provider.id}
              providerName={provider.fullName}
            />
          )}
        </div>
      </div>
    </div>
  );
}
