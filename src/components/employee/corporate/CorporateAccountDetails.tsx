
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CorporateAccount } from "@/types/corporate";
import { formatCurrency } from "@/utils/formatters";
import { Building, Users, Package, TicketIcon, Wallet } from "lucide-react";

interface CorporateAccountDetailsProps {
  account: CorporateAccount;
}

export const CorporateAccountDetails = ({ account }: CorporateAccountDetailsProps) => {
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
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Account Balance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-4xl font-bold text-primary">
                {formatCurrency(account.accountBalance)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">Current Balance</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees">
        <TabsList className="grid grid-cols-3 w-full">
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
        </TabsList>

        <TabsContent value="employees" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Employees ({account.employees.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {account.employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests ({account.requests.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Employee</TableHead>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets ({account.tickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {account.tickets.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No support tickets found for this account.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {account.tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.title}</TableCell>
                        <TableCell>{ticket.createdBy}</TableCell>
                        <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={ticket.status === "open" ? "default" : "outline"}>
                            {ticket.status === "open" ? "Open" : "Closed"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {ticket.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
