
import { Badge } from '@/components/ui/badge';

interface InvoiceStatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export function InvoiceStatusBadge({ status, size = 'md' }: InvoiceStatusBadgeProps) {
  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Unpaid':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Get size class
  const getSizeClass = (size: string): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1.5 text-sm';
      case 'md':
      default:
        return 'px-2.5 py-1 text-xs';
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} ${getSizeClass(size)} font-medium rounded-full`}>
      {status}
    </Badge>
  );
}
