import { useState } from 'react';
import { ServiceProvider, InternalNote, BankAccount } from '@/types/provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/formatters';
import { Phone, Mail, MapPin, Calendar, FileText, CreditCard, Truck, Shield, ClipboardList, Receipt, Clock, Plus, Edit, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProviderDetailsProps {
  provider: ServiceProvider;
  onBack: () => void;
  onAddNote: (providerId: string, note: InternalNote) => void;
  onAddBankAccount: (providerId: string, account: BankAccount) => void;
}

export function ProviderDetails({ provider, onBack, onAddNote, onAddBankAccount }: ProviderDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingBankAccount, setIsAddingBankAccount] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState<Partial<BankAccount>>({
    bankName: '',
    accountNumber: '',
    iban: '',
    isPrimary: false
  });

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: InternalNote = {
        id: `note-${Date.now()}`,
        text: newNote,
        createdAt: new Date().toISOString(),
        createdBy: {
          id: 'emp-001',
          name: 'Fatima Al-Sulaiman',
          role: 'Provider Manager'
        }
      };
      
      onAddNote(provider.id, note);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending_review':
        return 'secondary';
      case 'suspended':
      case 'blacklisted':
        return 'destructive';
      case 'paused':
        return 'outline';
      case 'deleted':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getFormattedStatus = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending_review':
        return 'Pending Review';
      case 'suspended':
        return 'Suspended';
      case 'paused':
        return 'Paused';
      case 'blacklisted':
        return 'Blacklisted';
      case 'deleted':
        return 'Deleted';
      default:
        return status;
    }
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'verified':
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          ← Back to providers list
        </Button>
        <Badge variant={getStatusBadgeVariant(provider.status) as any} className="text-sm py-1 px-3">
          {getFormattedStatus(provider.status)}
        </Badge>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={provider.profilePhoto} alt={provider.fullName} />
            <AvatarFallback className="text-2xl">{provider.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-grow space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{provider.fullName}</h2>
            {provider.company && <p className="text-muted-foreground">Company: {provider.company}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{provider.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{provider.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{provider.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {new Date(provider.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>National ID: {provider.nationalId}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span>Commission: {provider.commissionPercentage}%</span>
            </div>
          </div>
        </div>
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Internal Notes</CardTitle>
                <CardDescription>Internal notes about this provider</CardDescription>
              </div>
              <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Note
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Internal Note</DialogTitle>
                    <DialogDescription>
                      Add a new internal note about this provider. Only visible to employees.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="note">Note</Label>
                      <Textarea
                        id="note"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={4}
                        placeholder="Enter your note here..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingNote(false)}>Cancel</Button>
                    <Button onClick={handleAddNote}>Save Note</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {provider.internalNotes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No internal notes found</p>
              ) : (
                <div className="space-y-4">
                  {provider.internalNotes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{note.createdBy.name} <span className="text-muted-foreground">({note.createdBy.role})</span></div>
                        <div className="text-sm text-muted-foreground">{new Date(note.createdAt).toLocaleString()}</div>
                      </div>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bank" className="space-y-4 mt-6">
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
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Provider's verification documents</CardDescription>
            </CardHeader>
            <CardContent>
              {provider.documents.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No documents found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.documents.map((document) => (
                    <div key={document.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-video relative bg-gray-100">
                        <img 
                          src={document.url} 
                          alt={document.description}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start mb-1">
                          <div className="font-medium capitalize">
                            {document.type.replace('_', ' ')}
                          </div>
                          <Badge 
                            variant={document.status === 'verified' ? 'default' : (document.status === 'rejected' ? 'destructive' : 'secondary')} 
                            className={getStatusClassName(document.status)}
                          >
                            {document.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{document.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Orders History</CardTitle>
              <CardDescription>All orders associated with this provider</CardDescription>
            </CardHeader>
            <CardContent>
              {provider.orders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No orders found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {provider.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.taskId}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{order.serviceType}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={order.status === 'Completed' ? 'default' : 'secondary'}
                            className={order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : ''}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Financial transactions with this provider</CardDescription>
            </CardHeader>
            <CardContent>
              {provider.transactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No transactions found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {provider.transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell className="capitalize">{transaction.type}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={transaction.status === 'completed' ? 'default' : (transaction.status === 'failed' ? 'destructive' : 'secondary')}
                            className={getStatusClassName(transaction.status)}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Record of all actions on this provider account</CardDescription>
            </CardHeader>
            <CardContent>
              {provider.actionLog.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No activity records found</p>
              ) : (
                <div className="relative pl-6 border-l">
                  {provider.actionLog.map((log, index) => (
                    <div key={log.id} className={`relative mb-8 ${index !== provider.actionLog.length - 1 ? 'pb-8' : ''}`}>
                      <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-background border flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-sm mb-1">{log.action}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {new Date(log.timestamp).toLocaleString()} • By {log.performedBy.name} ({log.performedBy.role})
                        </div>
                        <p className="text-sm bg-muted p-3 rounded-md">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

