
import React, { useState } from 'react';
import { ServiceProvider, BankAccount } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, CreditCard, Trash2 } from 'lucide-react';

interface BankAccountsTabProps {
  provider: ServiceProvider;
  onAddAccount: (account: BankAccount) => void;
}

export function BankAccountsTab({ provider, onAddAccount }: BankAccountsTabProps) {
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    iban: '',
    isPrimary: false
  });

  const handleAddAccount = () => {
    if (newAccount.bankName && newAccount.accountNumber && newAccount.iban) {
      const account: BankAccount = {
        id: `acc-${Date.now()}`,
        bankName: newAccount.bankName,
        accountNumber: newAccount.accountNumber,
        iban: newAccount.iban,
        isPrimary: newAccount.isPrimary
      };
      
      onAddAccount(account);
      
      // Reset form
      setNewAccount({
        bankName: '',
        accountNumber: '',
        iban: '',
        isPrimary: false
      });
      
      setIsAddingAccount(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bank Accounts</CardTitle>
          <CardDescription>
            Bank accounts for provider payments
          </CardDescription>
        </div>
        <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
              <DialogDescription>
                Add a new bank account for this provider.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={newAccount.bankName}
                  onChange={(e) => setNewAccount({...newAccount, bankName: e.target.value})}
                  placeholder="e.g., Al Rajhi Bank"
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                  placeholder="Account number"
                />
              </div>
              <div>
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  value={newAccount.iban}
                  onChange={(e) => setNewAccount({...newAccount, iban: e.target.value})}
                  placeholder="SA00 0000 0000 0000 0000 0000"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isPrimary" 
                  checked={newAccount.isPrimary}
                  onCheckedChange={(checked) => 
                    setNewAccount({...newAccount, isPrimary: checked === true})
                  }
                />
                <Label htmlFor="isPrimary">Set as primary account</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingAccount(false)}>Cancel</Button>
              <Button onClick={handleAddAccount}>Save Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {provider.bankAccounts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No bank accounts found</p>
        ) : (
          <div className="space-y-4">
            {provider.bankAccounts.map((account) => (
              <div key={account.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <div className="font-medium">{account.bankName}</div>
                      <div className="text-sm text-muted-foreground">
                        {account.accountNumber}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {account.isPrimary && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm font-mono bg-muted p-2 rounded">
                  IBAN: {account.iban}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
