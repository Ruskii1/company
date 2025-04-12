
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, Wallet, X } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { useToast } from "@/hooks/use-toast";

interface AccountBalanceCardProps {
  accountId: string;
  accountName: string;
  balance: number;
  onUpdateBalance?: (accountId: string, newBalance: number) => void;
}

export const AccountBalanceCard = ({ 
  accountId, 
  accountName,
  balance, 
  onUpdateBalance 
}: AccountBalanceCardProps) => {
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(balance);
  const { toast } = useToast();

  const handleSaveBalance = () => {
    if (onUpdateBalance) {
      onUpdateBalance(accountId, newBalance);
      
      toast({
        title: "Balance Updated",
        description: `The balance for ${accountName} has been updated to ${formatCurrency(newBalance)}.`,
      });
    }
    
    setIsEditingBalance(false);
  };

  const handleCancelEdit = () => {
    setNewBalance(balance);
    setIsEditingBalance(false);
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBalance(Number(e.target.value));
  };

  return (
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
              {formatCurrency(balance)}
            </div>
          ) : (
            <div className="w-full max-w-xs">
              <Input
                type="number"
                value={newBalance}
                onChange={handleBalanceChange}
                className="text-xl text-center"
                step="any"
              />
            </div>
          )}
          <div className="text-sm text-muted-foreground mt-2">Current Balance</div>
        </div>
      </CardContent>
    </Card>
  );
};
