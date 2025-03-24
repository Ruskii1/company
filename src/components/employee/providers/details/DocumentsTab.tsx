
import React from 'react';
import { ServiceProvider } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DocumentsTabProps {
  provider: ServiceProvider;
}

export function DocumentsTab({ provider }: DocumentsTabProps) {
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
        <CardTitle>Documents</CardTitle>
        <CardDescription>Provider's verification documents</CardDescription>
      </CardHeader>
      <CardContent>
        {provider.documents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No documents found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provider.documents.map((document) => (
              <div key={document.id} className="border rounded-lg overflow-hidden">
                <div className="aspect-video relative bg-gray-100">
                  <img 
                    src={document.url} 
                    alt={document.description}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium capitalize">
                      {document.type.replace('_', ' ')}
                    </div>
                    <Badge 
                      variant={document.status === 'verified' ? 'default' : (document.status === 'rejected' ? 'destructive' : 'secondary')} 
                      className={getStatusClassName(document.status)}
                    >
                      {document.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{document.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
