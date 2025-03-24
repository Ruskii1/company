
import React from 'react';
import { ServiceProvider } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface ActivityLogTabProps {
  provider: ServiceProvider;
  searchQuery?: string;
}

export function ActivityLogTab({ provider, searchQuery = '' }: ActivityLogTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>
          {searchQuery
            ? `Showing ${provider.actionLog.length} matching activities`
            : 'Record of all actions on this provider account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {provider.actionLog.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {searchQuery ? 'No activities match your search' : 'No activity records found'}
          </p>
        ) : (
          <div className="relative pl-6 border-l">
            {provider.actionLog.map((log, index) => (
              <div key={log.id} className={`relative mb-8 ${index !== provider.actionLog.length - 1 ? 'pb-8' : ''}`}>
                <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-background border flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-sm mb-1">{log.action}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(log.timestamp).toLocaleString()} • By {log.performedBy.name} ({log.performedBy.role})
                  </div>
                  <p className="text-sm bg-muted p-3 rounded-md">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
