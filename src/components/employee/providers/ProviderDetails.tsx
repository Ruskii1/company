
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceProvider, InternalNote, BankAccount } from '@/types/provider';
import { ProviderHeader } from './details/ProviderHeader';
import { OrdersTab } from './details/OrdersTab';
import { DocumentsTab } from './details/DocumentsTab';
import { TransactionsTab } from './details/TransactionsTab';
import { BankAccountsTab } from './details/BankAccountsTab';
import { InternalNotesTab } from './details/InternalNotesTab';
import { ActivityLogTab } from './details/ActivityLogTab';
import { LocationSimulator } from './LocationSimulator';
import { ProviderLiveMap } from '@/components/customer/ProviderLiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface ProviderDetailsProps {
  provider: ServiceProvider;
  onBack: () => void;
  onAddNote: (providerId: string, note: InternalNote) => void;
  onAddBankAccount: (providerId: string, account: BankAccount) => void;
}

export function ProviderDetails({
  provider,
  onBack,
  onAddNote,
  onAddBankAccount,
}: ProviderDetailsProps) {
  const [activeTab, setActiveTab] = useState('orders');

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

  return (
    <div className="space-y-6">
      <ProviderHeader provider={provider} onBack={onBack} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <OrdersTab orders={provider.orders} />
            </TabsContent>
            
            <TabsContent value="documents">
              <DocumentsTab documents={provider.documents} />
            </TabsContent>
            
            <TabsContent value="transactions">
              <TransactionsTab transactions={provider.transactions} />
            </TabsContent>
            
            <TabsContent value="bank-accounts">
              <BankAccountsTab 
                accounts={provider.bankAccounts} 
                onAddAccount={handleAddBankAccount} 
              />
            </TabsContent>
            
            <TabsContent value="notes">
              <InternalNotesTab 
                notes={provider.internalNotes} 
                onAddNote={handleAddInternalNote} 
              />
            </TabsContent>
            
            <TabsContent value="activity">
              <ActivityLogTab activityLog={provider.actionLog} />
            </TabsContent>
            
            <TabsContent value="location">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Provider Live Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProviderLiveMap 
                      providerId={provider.id}
                      providerName={provider.fullName}
                      providerLocation={{lat: 24.7136, lng: 46.6753}}
                    />
                  </CardContent>
                </Card>
                
                <LocationSimulator providerId={provider.id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          {activeTab !== 'location' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProviderLiveMap 
                  providerId={provider.id}
                  providerName={provider.fullName}
                  providerLocation={{lat: 24.7136, lng: 46.6753}}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
