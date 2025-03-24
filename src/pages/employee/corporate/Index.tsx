
import { useState } from 'react'
import { useCorporateAccounts } from '@/hooks/useCorporateAccounts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CorporateAccountsList } from '@/components/employee/corporate/CorporateAccountsList'
import { CorporateAccountDetails } from '@/components/employee/corporate/CorporateAccountDetails'

const CorporateAccountsPage = () => {
  const { corporateAccounts } = useCorporateAccounts()
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const selectedAccount = corporateAccounts.find(account => account.id === selectedAccountId)
  
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader>
        <CardTitle>Corporate Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedAccountId ? (
          <CorporateAccountsList 
            accounts={corporateAccounts} 
            onSelectAccount={(id) => setSelectedAccountId(id)} 
          />
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedAccountId(null)}
              className="mb-4 text-blue-600 hover:underline flex items-center"
            >
              ← Back to accounts list
            </button>
            
            {selectedAccount && (
              <CorporateAccountDetails account={selectedAccount} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CorporateAccountsPage
