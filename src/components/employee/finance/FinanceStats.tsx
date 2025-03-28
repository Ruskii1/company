
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';
import { FinancialSummary } from '@/types/finance';
import { DollarSign, CreditCard, AlertCircle, Receipt, FileText, PieChart } from 'lucide-react';

interface FinanceStatsProps {
  summaryData: FinancialSummary;
}

export function FinanceStats({ summaryData }: FinanceStatsProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;

  const stats = [
    {
      title: financeT.totalRevenue,
      value: formatCurrency(summaryData.totalRevenue),
      description: financeT.totalRevenueDescription,
      icon: DollarSign,
      color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300'
    },
    {
      title: financeT.paidInvoices,
      value: summaryData.paidInvoices,
      description: financeT.paidInvoicesDescription,
      icon: CreditCard,
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      title: financeT.unpaidInvoices,
      value: summaryData.unpaidInvoices,
      description: financeT.unpaidInvoicesDescription,
      icon: FileText,
      color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
    },
    {
      title: financeT.overdueInvoices,
      value: summaryData.overdueInvoices,
      description: financeT.overdueInvoicesDescription,
      icon: AlertCircle,
      color: 'text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300'
    },
    {
      title: financeT.totalTax,
      value: formatCurrency(summaryData.totalTax),
      description: financeT.totalTaxDescription,
      icon: PieChart,
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-900 dark:text-purple-300'
    },
    {
      title: financeT.cancellationFees,
      value: formatCurrency(summaryData.cancellationFees),
      description: financeT.cancellationFeesDescription,
      icon: Receipt,
      color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
