
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface WalletBalanceCardProps {
  balance: number;
  title?: string;
  description?: string;
  loading?: boolean;
  className?: string;
}

export function WalletBalanceCard({ 
  balance, 
  title = "Wallet Balance", 
  description = "Current available balance",
  loading = false,
  className = ""
}: WalletBalanceCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 w-24 bg-muted animate-pulse rounded"></div>
        ) : (
          <div className="text-3xl font-bold">
            <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(balance)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
