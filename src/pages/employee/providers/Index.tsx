import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Plus, UsersIcon } from 'lucide-react';
import { useServiceProviders } from '@/hooks/useServiceProviders';
import type { ServiceProvider, InternalNote, BankAccount, Document as ProviderDocument, ProviderStatus } from '@/types/provider';
import { ProvidersList } from '@/components/employee/providers/ProvidersList';
import { ProviderDetails } from '@/components/employee/providers/ProviderDetails';
import { ProviderFilter } from '@/components/employee/providers/ProviderFilter';
import { ProviderCredentials } from '@/components/ProviderCredentials';
import { useToast } from '@/hooks/use-toast';
import { serviceTypeValues } from '@/components/forms/ServiceTypeField';

const ServiceProvidersPage = () => {
  const { 
    providers, 
    allProviders,
    addInternalNote, 
    addBankAccount,
    addDocument,
    approveProvider,
    updateProviderStatus,
    filterProviders, 
    resetFilters 
  } = useServiceProviders();
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const { toast } = useToast();
  
  const selectedProvider = providers.find(provider => provider.id === selectedProviderId);
  
  const handleAddNote = (providerId: string, note: InternalNote) => {
    addInternalNote(providerId, note);
    
    toast({
      title: "Note Added",
      description: "Internal note has been added to the provider profile.",
    });
  };
  
  const handleAddBankAccount = (providerId: string, account: BankAccount) => {
    addBankAccount(providerId, account);
    
    toast({
      title: "Bank Account Added",
      description: `${account.bankName} account has been added to the provider profile.`,
    });
  };

  const handleAddDocument = (providerId: string, document: ProviderDocument) => {
    addDocument(providerId, document);
    
    toast({
      title: "Document Uploaded",
      description: `The ${document.type.replace('_', ' ')} document has been uploaded and is pending verification.`,
    });
  };

  const handleApproveProvider = (providerId: string, isApproved: boolean) => {
    approveProvider(providerId, isApproved);
  };
  
  const handleStatusChange = (providerId: string, status: ProviderStatus) => {
    updateProviderStatus(providerId, status);
    
    toast({
      title: "Provider Status Updated",
      description: `The provider's status has been updated to ${status.replace('_', ' ')}.`,
    });
  };
  
  const regions = Array.from(new Set(allProviders.map(provider => provider.region)));
  
  const standardServiceTypes = serviceTypeValues;

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <UsersIcon className="mr-2 h-5 w-5" />
          <CardTitle>Service Providers</CardTitle>
        </div>
        
        {!selectedProviderId && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCredentials(!showCredentials)}
            >
              {showCredentials ? "Hide Credentials" : "Show Credentials"}
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Provider
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        {!selectedProviderId ? (
          <div className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
              <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">Manage Service Providers</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                View, filter, and manage all service providers in the system. Click on a provider to see detailed information.
              </AlertDescription>
            </Alert>
            
            {showCredentials && (
              <div className="mb-4">
                <ProviderCredentials />
              </div>
            )}
            
            <ProviderFilter 
              onFilter={filterProviders}
              onReset={resetFilters}
              regions={regions}
              serviceTypes={standardServiceTypes}
            />
            
            <div className="mt-4 h-[calc(100vh-22rem)] min-h-[400px]">
              <ProvidersList 
                providers={providers}
                onSelectProvider={setSelectedProviderId}
              />
            </div>
          </div>
        ) : selectedProvider ? (
          <ProviderDetails
            provider={selectedProvider}
            onBack={() => setSelectedProviderId(null)}
            onAddNote={handleAddNote}
            onAddBankAccount={handleAddBankAccount}
            onApproveProvider={handleApproveProvider}
            onAddDocument={handleAddDocument}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="text-center py-12">
            <p>Provider not found. Please go back and select a different provider.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSelectedProviderId(null)}>
              Back to providers list
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceProvidersPage;
