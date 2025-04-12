
import { CorporateAccount } from "@/types/corporate";
import { CompanyInfoCard } from "./details/CompanyInfoCard";
import { AccountBalanceCard } from "./details/AccountBalanceCard";
import { AccountDetailsTabs } from "./details/AccountDetailsTabs";

interface CorporateAccountDetailsProps {
  account: CorporateAccount;
  onUpdateBalance?: (accountId: string, newBalance: number) => void;
}

export const CorporateAccountDetails = ({ 
  account,
  onUpdateBalance
}: CorporateAccountDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <CompanyInfoCard account={account} />
        <AccountBalanceCard 
          accountId={account.id}
          accountName={account.name}
          balance={account.accountBalance}
          onUpdateBalance={onUpdateBalance}
        />
      </div>

      <AccountDetailsTabs account={account} />
    </div>
  );
};
