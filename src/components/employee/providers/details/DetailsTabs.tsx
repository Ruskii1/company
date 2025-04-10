
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceProvider, InternalNote, BankAccount, Document as ProviderDocument } from '@/types/provider';
import { OrdersTab } from './OrdersTab';
import { DocumentsTab } from './DocumentsTab';
import { TransactionsTab } from './TransactionsTab';
import { BankAccountsTab } from './BankAccountsTab';
import { InternalNotesTab } from './InternalNotesTab';
import { ActivityLogTab } from './ActivityLogTab';
import { LocationTab } from './LocationTab';

interface DetailsTabsProps {
  provider: ServiceProvider;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddNote: (text: string) => void;
  onAddBankAccount: (account: BankAccount) => void;
  onDocumentUploaded: (document: ProviderDocument) => void;
}

export function DetailsTabs({
  provider,
  activeTab,
  onTabChange,
  onAddNote,
  onAddBankAccount,
  onDocumentUploaded
}: DetailsTabsProps) {
  return (
    <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="bank-accounts">Bank Accounts</TabsTrigger>
        <TabsTrigger value="notes">Internal Notes</TabsTrigger>
        <TabsTrigger value="activity">Activity Log</TabsTrigger>
        <TabsTrigger value="location">Live Location</TabsTrigger>
      </TabsList>
      
      <TabsContent value="orders">
        <OrdersTab provider={provider} />
      </TabsContent>
      
      <TabsContent value="documents">
        <DocumentsTab 
          provider={provider} 
          onDocumentUploaded={onDocumentUploaded}
        />
      </TabsContent>
      
      <TabsContent value="transactions">
        <TransactionsTab provider={provider} />
      </TabsContent>
      
      <TabsContent value="bank-accounts">
        <BankAccountsTab 
          provider={provider}
          onAddAccount={onAddBankAccount} 
        />
      </TabsContent>
      
      <TabsContent value="notes">
        <InternalNotesTab 
          provider={provider}
          onAddNote={onAddNote} 
        />
      </TabsContent>
      
      <TabsContent value="activity">
        <ActivityLogTab provider={provider} />
      </TabsContent>
      
      <TabsContent value="location">
        <LocationTab providerId={provider.id} providerName={provider.fullName} />
      </TabsContent>
    </Tabs>
  );
}
