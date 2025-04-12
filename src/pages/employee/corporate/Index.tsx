
import { useState } from 'react'
import { useCorporateAccounts } from '@/hooks/useCorporateAccounts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon, Building } from 'lucide-react'
import { CorporateAccountsList } from '@/components/employee/corporate/CorporateAccountsList'
import { CorporateAccountDetails } from '@/components/employee/corporate/CorporateAccountDetails'
import { useToast } from '@/hooks/use-toast'

const CorporateAccountsPage = () => {
  const { corporateAccounts, updateAccountBalance } = useCorporateAccounts()
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const selectedAccount = corporateAccounts.find(account => account.id === selectedAccountId)
  const { toast } = useToast()

  const handleUpdateBalance = (accountId: string, newBalance: number) => {
    updateAccountBalance(accountId, newBalance)
    
    toast({
      title: "Balance Updated",
      description: `The account balance has been updated successfully.`,
    })
  }
  
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader>
        <div className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          <CardTitle>Corporate Accounts</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {!selectedAccountId ? (
          <div className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
              <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">Manage Corporate Accounts</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                View and manage all corporate client accounts in the system. Click on an account to see detailed information.
              </AlertDescription>
            </Alert>
            
            <CorporateAccountsList 
              accounts={corporateAccounts} 
              onSelectAccount={(id) => setSelectedAccountId(id)} 
            />
          </div>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedAccountId(null)}
              className="mb-4 text-blue-600 hover:underline flex items-center"
            >
              ← Back to accounts list
            </button>
            
            {selectedAccount && (
              <CorporateAccountDetails 
                account={selectedAccount} 
                onUpdateBalance={handleUpdateBalance}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CorporateAccountsPage
