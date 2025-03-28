
import { useState } from 'react';
import { useLanguageStore, translations } from '@/lib/i18n';
import { MonthlyRevenue, ServiceTypeRevenue } from '@/types/finance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonthlyRevenueBarChart } from './charts/MonthlyRevenueBarChart';
import { ServiceRevenueChart } from './charts/ServiceRevenueChart';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface RevenueChartProps {
  monthlyData: MonthlyRevenue[];
  serviceTypeData: ServiceTypeRevenue[];
}

export function RevenueChart({ monthlyData, serviceTypeData }: RevenueChartProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{t.revenueAnalysis}</CardTitle>
        <CardDescription>{t.revenueAnalysisDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>{t.monthlyRevenue}</span>
            </TabsTrigger>
            <TabsTrigger value="service" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>{t.revenueByServiceType}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="h-[400px]">
            <MonthlyRevenueBarChart monthlyData={monthlyData} />
          </TabsContent>
          
          <TabsContent value="service" className="h-[400px]">
            <ServiceRevenueChart serviceTypeData={serviceTypeData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
