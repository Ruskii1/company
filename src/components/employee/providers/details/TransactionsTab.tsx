
import React from 'react';
import { ServiceProvider } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/formatters';

interface TransactionsTabProps {
  provider: ServiceProvider;
}

export function TransactionsTab({ provider }: TransactionsTabProps) {
  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'verified':
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Financial transactions with this provider</CardDescription>
      </CardHeader>
      <CardContent>
        {provider.transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No transactions found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {provider.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize">{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : (transaction.status === 'failed' ? 'destructive' : 'secondary')}
                      className={getStatusClassName(transaction.status)}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
