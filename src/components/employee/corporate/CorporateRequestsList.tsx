
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CorporateAccount } from "@/types/corporate";
import { formatCurrency } from "@/utils/formatters";

interface CorporateRequestsListProps {
  account: CorporateAccount;
}

export const CorporateRequestsList = ({ account }: CorporateRequestsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Requests ({account.requests.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {account.requests.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No service requests found for this account.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Pickup Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {account.requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.taskId}</TableCell>
                  <TableCell>{request.serviceType}</TableCell>
                  <TableCell>{new Date(request.date).toLocaleString()}</TableCell>
                  <TableCell>{request.employeeName}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{request.pickupLocation}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === "Completed" ? "outline" : "default"}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(request.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
