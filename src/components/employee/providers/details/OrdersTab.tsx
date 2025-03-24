
import React from 'react';
import { ServiceProvider } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/formatters';

interface OrdersTabProps {
  provider: ServiceProvider;
  searchQuery?: string;
}

export function OrdersTab({ provider, searchQuery = '' }: OrdersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
        <CardDescription>
          {searchQuery 
            ? `Showing ${provider.orders.length} matching orders` 
            : 'All orders associated with this provider'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {provider.orders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {searchQuery ? 'No orders match your search' : 'No orders found'}
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {provider.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.taskId}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.serviceType}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={order.status === 'Completed' ? 'default' : 'secondary'}
                      className={order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : ''}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
