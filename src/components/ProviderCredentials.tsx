
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Check, User, Lock } from "lucide-react";
import { toast } from "sonner";

interface CredentialProps {
  label: string;
  value: string;
}

const CredentialItem = ({ label, value }: CredentialProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="font-medium">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-mono">{value}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export function ProviderCredentials() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Test Provider Credentials
        </CardTitle>
        <CardDescription>
          Use these credentials to login as a test provider
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-3 rounded-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Provider Account</span>
            <Badge>Default</Badge>
          </div>
          
          <div className="space-y-1">
            <CredentialItem label="Email" value="provider@example.com" />
            <CredentialItem label="Password" value="provider123" />
            <CredentialItem label="Phone" value="+123456789" />
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            This account is pre-approved and ready to use
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Note: In production, you should never store passwords in plain text. 
          This is only for testing purposes.
        </p>
      </CardFooter>
    </Card>
  );
}
