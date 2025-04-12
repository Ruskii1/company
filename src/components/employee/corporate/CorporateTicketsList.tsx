
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CorporateAccount, CorporateTicket } from "@/types/corporate";
import { MessageSquare, User, Calendar, Tag } from "lucide-react";

interface CorporateTicketsListProps {
  account: CorporateAccount;
}

export const CorporateTicketsList = ({ account }: CorporateTicketsListProps) => {
  const [selectedTicket, setSelectedTicket] = useState<CorporateTicket | null>(null);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Tickets ({account.tickets.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedTicket ? (
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedTicket(null)}
              className="text-blue-600 hover:underline flex items-center"
            >
              ← Back to tickets list
            </button>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedTicket.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Created by {selectedTicket.createdBy}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedTicket.createdAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <Badge variant={selectedTicket.status === "open" ? "default" : "outline"}>
                    {selectedTicket.status === "open" ? "Open" : "Closed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <p>{selectedTicket.description}</p>
                </div>
                
                <div className="flex gap-1 items-center">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {selectedTicket.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <Button variant="outline">Add Comment</Button>
                    <Button 
                      variant={selectedTicket.status === "open" ? "default" : "outline"}
                    >
                      {selectedTicket.status === "open" ? "Close Ticket" : "Reopen Ticket"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
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
                    <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
