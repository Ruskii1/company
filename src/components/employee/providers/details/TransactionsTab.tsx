
import React, { useState } from 'react';
import { ServiceProvider } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/formatters';
import { DateRange } from 'react-day-picker';
import { useTransactions } from '@/hooks/useTransactions';
import { FilterableTransactionType } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

interface TransactionsTabProps {
  provider: ServiceProvider;
  searchQuery?: string;
}

export function TransactionsTab({ provider, searchQuery = '' }: TransactionsTabProps) {
  const { transactions, loading, filters, updateFilters } = useTransactions(provider.id, 'provider');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getStatusClassName = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'commission':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'refund':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'bonus':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'adjustment':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      default:
        return '';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'payment':
        return 'default';
      case 'commission':
        return 'secondary';
      case 'refund':
        return 'destructive';
      case 'bonus':
        return 'outline';
      case 'adjustment':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleDateRangeChange = (range: DateRange) => {
    updateFilters({ dateRange: range });
  };

  const handleTransactionTypeChange = (value: string) => {
    updateFilters({ transactionType: value as FilterableTransactionType });
  };

  const filteredTransactions = searchQuery
    ? transactions.filter(tx => 
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactions;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            {searchQuery
              ? `Showing ${filteredTransactions.length} matching transactions`
              : 'Financial transactions with this provider'
            }
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </CardHeader>
      {isFilterOpen && (
        <div className="px-6 pb-4 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, 'LLL dd, y')} - {format(filters.dateRange.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(filters.dateRange.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={filters.dateRange}
                  onSelect={handleDateRangeChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Transaction Type</label>
            <Select 
              value={filters.transactionType} 
              onValueChange={handleTransactionTypeChange}
            >
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {searchQuery ? 'No transactions match your search' : 'No transactions found'}
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={getBadgeVariant(transaction.type)}
                      className={getStatusClassName(transaction.type)}
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.reference || '-'}</TableCell>
                  <TableCell className="text-right font-medium">
                    <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
