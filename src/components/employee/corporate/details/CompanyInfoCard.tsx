
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { CorporateAccount } from "@/types/corporate";

interface CompanyInfoCardProps {
  account: CorporateAccount;
}

export const CompanyInfoCard = ({ account }: CompanyInfoCardProps) => {
  return (
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
  );
};
