
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Clipboard, CheckCircle } from 'lucide-react';
import { useLanguageStore, translations } from '@/lib/i18n';

// Define default credentials for providers
export const defaultProviderCredentials = {
  admin: {
    username: 'admin',
    password: 'provider-admin',
    idNumber: 'P-1000'
  },
  regular: {
    username: 'provider',
    password: 'provider123',
    idNumber: 'P-2000'
  },
  demo: {
    username: 'demo-provider',
    password: 'demo456',
    idNumber: 'P-3000'
  }
};

export const DefaultProviderCredentials = () => {
  const { language } = useLanguageStore();
  const t = translations[language];
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyToClipboard = (credentialType: string, credentials: typeof defaultProviderCredentials.admin) => {
    const text = `Username: ${credentials.username}\nPassword: ${credentials.password}\nID Number: ${credentials.idNumber}`;
    navigator.clipboard.writeText(text);
    
    setCopied(credentialType);
    setTimeout(() => setCopied(null), 2000);
    
    toast({
      title: "Credentials Copied",
      description: "Provider credentials have been copied to clipboard",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Provider Credentials</CardTitle>
        <CardDescription>Use these credentials to log in as different types of providers during testing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(defaultProviderCredentials).map(([type, credentials]) => (
          <div key={type} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium capitalize">{type} Provider</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopyToClipboard(type, credentials)}
                className="flex items-center gap-1"
              >
                {copied === type ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label htmlFor={`${type}-username`}>Username</Label>
                <Input 
                  id={`${type}-username`} 
                  value={credentials.username} 
                  readOnly 
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor={`${type}-password`}>Password</Label>
                <Input 
                  id={`${type}-password`} 
                  value={credentials.password} 
                  readOnly 
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor={`${type}-id`}>ID Number</Label>
                <Input 
                  id={`${type}-id`} 
                  value={credentials.idNumber} 
                  readOnly 
                  className="bg-muted"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          These credentials are for demonstration purposes only
        </p>
      </CardFooter>
    </Card>
  );
};
