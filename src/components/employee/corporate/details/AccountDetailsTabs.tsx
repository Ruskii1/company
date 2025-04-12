
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Package, TicketIcon, Users } from "lucide-react";
import { CorporateAccount } from "@/types/corporate";
import { CorporateEmployeesList } from "../CorporateEmployeesList";
import { CorporateRequestsList } from "../CorporateRequestsList";
import { CorporateTicketsList } from "../CorporateTicketsList";
import { CorporateInfoTab } from "../CorporateInfoTab";

interface AccountDetailsTabsProps {
  account: CorporateAccount;
}

export const AccountDetailsTabs = ({ account }: AccountDetailsTabsProps) => {
  return (
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
  );
};
