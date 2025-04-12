
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CorporateAccount } from "@/types/corporate";
import { formatCurrency } from "@/utils/formatters";
import { 
  Building, 
  Users, 
  Package, 
  TicketIcon, 
  Wallet, 
  FileText, 
  Upload,
  Edit,
  Save,
  X
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CorporateEmployeesList } from "./CorporateEmployeesList";
import { CorporateRequestsList } from "./CorporateRequestsList";
import { CorporateTicketsList } from "./CorporateTicketsList";
import { CorporateInfoTab } from "./CorporateInfoTab";

interface CorporateAccountDetailsProps {
  account: CorporateAccount;
  onUpdateBalance?: (accountId: string, newBalance: number) => void;
}

export const CorporateAccountDetails = ({ 
  account,
  onUpdateBalance
}: CorporateAccountDetailsProps) => {
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(account.accountBalance);
  const { toast } = useToast();

  const handleSaveBalance = () => {
    if (onUpdateBalance) {
      onUpdateBalance(account.id, newBalance);
      
      toast({
        title: "Balance Updated",
        description: `The balance for ${account.name} has been updated to ${formatCurrency(newBalance)}.`,
      });
    }
    
    setIsEditingBalance(false);
  };

  const handleCancelEdit = () => {
    setNewBalance(account.accountBalance);
    setIsEditingBalance(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Company Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Company Name</dt>
                <dd className="text-lg font-semibold">{account.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Contact Person</dt>
                <dd>{account.contactPerson}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd>{account.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                <dd>{account.phone}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd>{account.address}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Account Balance</CardTitle>
              </div>
              {!isEditingBalance ? (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsEditingBalance(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleSaveBalance}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full">
              {!isEditingBalance ? (
                <div className="text-4xl font-bold text-primary">
                  {formatCurrency(account.accountBalance)}
                </div>
              ) : (
                <div className="w-full max-w-xs">
                  <Input
                    type="number"
                    value={newBalance}
                    onChange={(e) => setNewBalance(Number(e.target.value))}
                    className="text-xl text-center"
                  />
                </div>
              )}
              <div className="text-sm text-muted-foreground mt-2">Current Balance</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center gap-2">
            <TicketIcon className="h-4 w-4" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-4">
          <CorporateEmployeesList account={account} />
        </TabsContent>

        <TabsContent value="requests" className="mt-4">
          <CorporateRequestsList account={account} />
        </TabsContent>

        <TabsContent value="tickets" className="mt-4">
          <CorporateTicketsList account={account} />
        </TabsContent>

        <TabsContent value="info" className="mt-4">
          <CorporateInfoTab account={account} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
