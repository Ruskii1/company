
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Document } from '@/types/provider';
import { CheckCircle, Clock, XCircle, Eye, FileText } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getStatusIcon = () => {
    switch (document.status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };
  
  const getStatusText = () => {
    switch (document.status) {
      case 'verified':
        return 'Verified';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };
  
  const getStatusColor = () => {
    switch (document.status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
    }
  };
  
  const getFormattedType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const isImage = document.url.match(/\.(jpeg|jpg|gif|png)$/i) !== null;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        {isImage ? (
          <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
            <img 
              src={document.url} 
              alt={document.description}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800">
            <FileText className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-base">{getFormattedType(document.type)}</CardTitle>
          <Badge variant="outline" className={`text-xs flex items-center gap-1 ${getStatusColor()}`}>
            {getStatusIcon()}
            {getStatusText()}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{document.description}</p>
        
        <div className="text-xs text-muted-foreground">
          Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => window.open(document.url, '_blank')}
              >
                <Eye className="h-3.5 w-3.5 mr-2" />
                View Document
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open document in new tab</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
