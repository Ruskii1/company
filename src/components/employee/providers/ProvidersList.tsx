
import { ServiceProvider, ProviderStatus } from '@/types/provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/formatters';
import { StatusBadge } from './list/StatusBadge';
import { AvailabilityBadge } from './list/AvailabilityBadge';
import { ServiceTypeBadges } from './list/ServiceTypeBadges';
import { ProviderActions } from './list/ProviderActions';

interface ProvidersListProps {
  providers: ServiceProvider[];
  onSelectProvider: (id: string) => void;
  onToggleStatus: (id: string, status: ProviderStatus) => void;
}

export function ProvidersList({ providers, onSelectProvider, onToggleStatus }: ProvidersListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Service Types</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No providers found
              </TableCell>
            </TableRow>
          ) : (
            providers.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">{provider.fullName}</TableCell>
                <TableCell>{provider.region}</TableCell>
                <TableCell>
                  <ServiceTypeBadges serviceTypes={provider.serviceTypes} />
                </TableCell>
                <TableCell>
                  <AvailabilityBadge 
                    status={provider.availabilityStatus} 
                    lastSeen={provider.lastSeen} 
                  />
                </TableCell>
                <TableCell>
                  <StatusBadge status={provider.status} />
                </TableCell>
                <TableCell>{provider.commissionPercentage}%</TableCell>
                <TableCell className="text-right">
                  <ProviderActions 
                    provider={provider}
                    onSelectProvider={onSelectProvider}
                    onToggleStatus={onToggleStatus}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
