
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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ProviderDetailsProps {
  provider: ServiceProvider;
  onBack: () => void;
  onAddNote: (providerId: string, note: InternalNote) => void;
  onAddBankAccount: (providerId: string, account: BankAccount) => void;
}

export function ProviderDetails({ provider, onBack, onAddNote, onAddBankAccount }: ProviderDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filteredProvider = {
    ...provider,
    internalNotes: searchQuery 
      ? provider.internalNotes.filter(note => 
          note.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.createdBy.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : provider.internalNotes,
    orders: searchQuery
      ? provider.orders.filter(order => 
          order.taskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.status.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : provider.orders,
    transactions: searchQuery
      ? provider.transactions.filter(transaction => 
          transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.status.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : provider.transactions,
    actionLog: searchQuery
      ? provider.actionLog.filter(log => 
          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.performedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : provider.actionLog,
    documents: searchQuery
      ? provider.documents.filter(doc => 
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : provider.documents
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      <ProviderHeader provider={provider} onBack={onBack} />

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search transactions, orders, notes..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

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
          <InternalNotesTab 
            provider={filteredProvider} 
            onAddNote={onAddNote} 
            searchQuery={searchQuery}
          />
        </TabsContent>
        
        <TabsContent value="bank" className="space-y-4 mt-6">
          <BankAccountsTab provider={filteredProvider} onAddBankAccount={onAddBankAccount} />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4 mt-6">
          <DocumentsTab provider={filteredProvider} searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4 mt-6">
          <OrdersTab provider={filteredProvider} searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4 mt-6">
          <TransactionsTab provider={filteredProvider} searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4 mt-6">
          <ActivityLogTab provider={filteredProvider} searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
