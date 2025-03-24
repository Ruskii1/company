
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CorporateAccount } from "@/types/corporate";
import { formatCurrency } from "@/utils/formatters";

interface CorporateAccountsListProps {
  accounts: CorporateAccount[];
  onSelectAccount: (id: string) => void;
}

export const CorporateAccountsList = ({
  accounts,
  onSelectAccount,
}: CorporateAccountsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Corporate Accounts ({accounts.length})</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Pending Requests</TableHead>
            <TableHead>Open Tickets</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => {
            const pendingRequests = account.requests.filter(
              (req) => req.status !== "Completed"
            ).length;
            const openTickets = account.tickets.filter(
              (ticket) => ticket.status === "open"
            ).length;

            return (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.contactPerson}</TableCell>
                <TableCell>{formatCurrency(account.accountBalance)}</TableCell>
                <TableCell>{account.employees.length}</TableCell>
                <TableCell>{pendingRequests}</TableCell>
                <TableCell>{openTickets}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectAccount(account.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
