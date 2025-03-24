
import React, { useState } from 'react';
import { ServiceProvider, BankAccount } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, Edit, Plus } from 'lucide-react';

interface BankAccountsTabProps {
  provider: ServiceProvider;
  onAddBankAccount: (providerId: string, account: BankAccount) => void;
}

export function BankAccountsTab({ provider, onAddBankAccount }: BankAccountsTabProps) {
  const [isAddingBankAccount, setIsAddingBankAccount] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState<Partial<BankAccount>>({
    bankName: '',
    accountNumber: '',
    iban: '',
    isPrimary: false
  });

  const handleAddBankAccount = () => {
    if (newBankAccount.bankName && newBankAccount.accountNumber && newBankAccount.iban) {
      const account: BankAccount = {
        id: `bank-${Date.now()}`,
        bankName: newBankAccount.bankName,
        accountNumber: newBankAccount.accountNumber,
        iban: newBankAccount.iban,
        isPrimary: newBankAccount.isPrimary || false
      };
      
      onAddBankAccount(provider.id, account);
      setNewBankAccount({
        bankName: '',
        accountNumber: '',
        iban: '',
        isPrimary: false
      });
      setIsAddingBankAccount(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bank Accounts</CardTitle>
          <CardDescription>Manage provider's bank accounts</CardDescription>
        </div>
        <Dialog open={isAddingBankAccount} onOpenChange={setIsAddingBankAccount}>
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
                  value={newBankAccount.bankName}
                  onChange={(e) => setNewBankAccount({...newBankAccount, bankName: e.target.value})}
                  placeholder="e.g. Al Rajhi Bank"
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={newBankAccount.accountNumber}
                  onChange={(e) => setNewBankAccount({...newBankAccount, accountNumber: e.target.value})}
                  placeholder="e.g. 0987654321"
                />
              </div>
              <div>
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  value={newBankAccount.iban}
                  onChange={(e) => setNewBankAccount({...newBankAccount, iban: e.target.value})}
                  placeholder="e.g. SA03 8000 0000 6080 1016 7519"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={newBankAccount.isPrimary}
                  onChange={(e) => setNewBankAccount({...newBankAccount, isPrimary: e.target.checked})}
                  className="h-4 w-4"
                />
                <Label htmlFor="isPrimary">Set as primary account</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingBankAccount(false)}>Cancel</Button>
              <Button onClick={handleAddBankAccount}>Save Account</Button>
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
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    {account.bankName}
                    {account.isPrimary && (
                      <Badge className="ml-2" variant="secondary">Primary</Badge>
                    )}
                  </div>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                  <div>
                    <span className="text-muted-foreground">Account Number:</span> {account.accountNumber}
                  </div>
                  <div>
                    <span className="text-muted-foreground">IBAN:</span> {account.iban}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
