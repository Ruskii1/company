
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguageStore, translations } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Wallet } from "lucide-react";
import { useRequestsData } from "@/hooks/useRequestsData";
import { Link } from "react-router-dom";

export function CustomerOverview() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const dt = t.customer.dashboard;
  const { pastRequests, todayRequests, futureRequests } = useRequestsData();
  
  // Mock company balance (this would come from an API in a real implementation)
  const companyBalance = 5000; // SAR
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dt.pastRequests}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{pastRequests.length}</span>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/requests?tab=past">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dt.todaysRequests}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{todayRequests.length}</span>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/requests?tab=today">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dt.futureRequests}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{futureRequests.length}</span>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/requests?tab=future">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dt.companyBalance}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
                    style: 'currency',
                    currency: 'SAR'
                  }).format(companyBalance)}
                </span>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/credit">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
