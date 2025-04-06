
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Plus, UsersIcon } from 'lucide-react';
import { useServiceProviders } from '@/hooks/useServiceProviders';
import { ServiceProvider, InternalNote, BankAccount, Document } from '@/types/provider';
import { ProvidersList } from '@/components/employee/providers/ProvidersList';
import { ProviderDetails } from '@/components/employee/providers/ProviderDetails';
import { ProviderFilter } from '@/components/employee/providers/ProviderFilter';
import { useToast } from '@/hooks/use-toast';
import { serviceTypeValues } from '@/components/forms/ServiceTypeField';

const ServiceProvidersPage = () => {
  const { 
    providers, 
    allProviders,
    addInternalNote, 
    addBankAccount,
    addDocument,
    filterProviders, 
    resetFilters 
  } = useServiceProviders();
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
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

  const handleAddDocument = (providerId: string, document: Document) => {
    addDocument(providerId, document);
    
    toast({
      title: "Document Uploaded",
      description: `The ${document.type.replace('_', ' ')} document has been uploaded and is pending verification.`,
    });
  };
  
  // Get unique regions from providers
  const regions = Array.from(new Set(allProviders.map(provider => provider.region)));
  
  // Use standardized service types from ServiceTypeField instead of extracting from providers
  const standardServiceTypes = serviceTypeValues;

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <UsersIcon className="mr-2 h-5 w-5" />
          <CardTitle>Service Providers</CardTitle>
        </div>
        
        {!selectedProviderId && (
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Add Provider
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!selectedProviderId ? (
          <div className="space-y-6">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Manage Service Providers</AlertTitle>
              <AlertDescription>
                View, filter, and manage all service providers in the system. Click on a provider to see detailed information.
              </AlertDescription>
            </Alert>
            
            <ProviderFilter 
              onFilter={filterProviders}
              onReset={resetFilters}
              regions={regions}
              serviceTypes={standardServiceTypes}
            />
            
            <ProvidersList 
              providers={providers}
              onSelectProvider={setSelectedProviderId}
            />
          </div>
        ) : selectedProvider ? (
          <ProviderDetails
            provider={selectedProvider}
            onBack={() => setSelectedProviderId(null)}
            onAddNote={handleAddNote}
            onAddBankAccount={handleAddBankAccount}
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
