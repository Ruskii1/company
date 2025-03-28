
import { useTheme } from '@/lib/theme';
import { useLanguageStore, translations } from '@/lib/i18n';
import { formatCurrency } from '@/utils/formatters';
import { MonthlyRevenue } from '@/types/finance';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface MonthlyRevenueBarChartProps {
  monthlyData: MonthlyRevenue[];
}

export function MonthlyRevenueBarChart({ monthlyData }: MonthlyRevenueBarChartProps) {
  const { theme } = useTheme();
  const { language } = useLanguageStore();
  const t = translations[language];

  // Format month labels
  const formattedMonthlyData = monthlyData.map(item => {
    const [year, month] = item.month.split('-');
    return {
      ...item,
      name: `${month}/${year.substring(2)}`,
    };
  });

  // Create a properly typed chart config object
  const chartConfig = {
    revenue: {
      label: t.revenue,
      color: theme === 'dark' ? '#8884d8' : '#8884d8'
    }
  };

  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedMonthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value).replace('SAR', '')} 
          />
          <ChartTooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="dark:border-slate-700"
                    payload={payload}
                  />
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar 
            dataKey="revenue" 
            fill={theme === 'dark' ? '#8884d8' : '#8884d8'} 
            name={t.revenue} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
