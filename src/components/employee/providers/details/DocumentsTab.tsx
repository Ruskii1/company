
import React from 'react';
import { ServiceProvider } from '@/types/provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileIcon } from 'lucide-react';

interface DocumentsTabProps {
  provider: ServiceProvider;
  searchQuery?: string;
}

export function DocumentsTab({ provider, searchQuery = '' }: DocumentsTabProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>
          {searchQuery
            ? `Showing ${provider.documents.length} matching documents`
            : 'Uploaded documents and verifications'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {provider.documents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {searchQuery ? 'No documents match your search' : 'No documents found'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provider.documents.map((document) => (
              <div key={document.id} className="border rounded-md p-4 flex items-start gap-3">
                <div className="bg-muted h-12 w-12 rounded-md flex items-center justify-center shrink-0">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium capitalize mb-1">{document.type.replace('_', ' ')}</h4>
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>{getStatusBadge(document.status)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
