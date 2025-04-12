
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CorporateAccount, Employee } from "@/types/corporate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface CorporateEmployeesListProps {
  account: CorporateAccount;
}

export const CorporateEmployeesList = ({ account }: CorporateEmployeesListProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees ({account.employees.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedEmployee ? (
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedEmployee(null)}
              className="text-blue-600 hover:underline flex items-center"
            >
              ← Back to employees list
            </button>
            
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">{selectedEmployee.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p>{selectedEmployee.position}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedEmployee.phone}</p>
                </div>
              </div>
              
              <Tabs defaultValue="requests">
                <TabsList>
                  <TabsTrigger value="requests">Requests</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="requests">
                  <Card>
                    <CardHeader>
                      <CardTitle>Employee Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {account.requests.filter(req => req.employeeName === selectedEmployee.name).length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Task ID</TableHead>
                              <TableHead>Service Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {account.requests
                              .filter(req => req.employeeName === selectedEmployee.name)
                              .map((request) => (
                                <TableRow key={request.id}>
                                  <TableCell className="font-medium">{request.taskId}</TableCell>
                                  <TableCell>{request.serviceType}</TableCell>
                                  <TableCell>{new Date(request.date).toLocaleString()}</TableCell>
                                  <TableCell>
                                    <Badge variant={request.status === "Completed" ? "outline" : "default"}>
                                      {request.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          No requests found for this employee.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tickets">
                  <Card>
                    <CardHeader>
                      <CardTitle>Employee Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {account.tickets.filter(ticket => ticket.createdBy === selectedEmployee.name).length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Tags</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {account.tickets
                              .filter(ticket => ticket.createdBy === selectedEmployee.name)
                              .map((ticket) => (
                                <TableRow key={ticket.id}>
                                  <TableCell className="font-medium">{ticket.title}</TableCell>
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
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          No tickets found for this employee.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <button
                      onClick={() => setSelectedEmployee(employee)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
