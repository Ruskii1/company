
import { useState } from 'react';
import { ServiceProvider, InternalNote, BankAccount } from '@/types/provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProviderHeader } from './details/ProviderHeader';
import { InternalNotesTab } from './details/InternalNotesTab';
import { BankAccountsTab } from './details/BankAccountsTab';
import { DocumentsTab } from './details/DocumentsTab';
import { OrdersTab } from './details/OrdersTab';
import { TransactionsTab } from './details/TransactionsTab';
import { ActivityLogTab } from './details/ActivityLogTab';

interface ProviderDetailsProps {
  provider: ServiceProvider;
  onBack: () => void;
  onAddNote: (providerId: string, note: InternalNote) => void;
  onAddBankAccount: (providerId: string, account: BankAccount) => void;
}

export function ProviderDetails({ provider, onBack, onAddNote, onAddBankAccount }: ProviderDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="space-y-4">
      <ProviderHeader provider={provider} onBack={onBack} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 mt-6">
          <InternalNotesTab provider={provider} onAddNote={onAddNote} />
        </TabsContent>
        
        <TabsContent value="bank" className="space-y-4 mt-6">
          <BankAccountsTab provider={provider} onAddBankAccount={onAddBankAccount} />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4 mt-6">
          <DocumentsTab provider={provider} />
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4 mt-6">
          <OrdersTab provider={provider} />
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4 mt-6">
          <TransactionsTab provider={provider} />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4 mt-6">
          <ActivityLogTab provider={provider} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
