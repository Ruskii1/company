
import { ServiceProvider } from '@/types/provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ServiceTypeBadges } from './list/ServiceTypeBadges';
import { StatusBadge } from './list/StatusBadge';
import { ProviderActions } from './list/ProviderActions';
import { DetailsBadge } from './list/DetailsBadge';

interface ProvidersListProps {
  providers: ServiceProvider[];
  onSelectProvider: (id: string) => void;
}

export function ProvidersList({ providers, onSelectProvider }: ProvidersListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Service Types</TableHead>
            <TableHead>Details</TableHead>
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
                  <DetailsBadge provider={provider} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={provider.status} />
                </TableCell>
                <TableCell>{provider.commissionPercentage}%</TableCell>
                <TableCell className="text-right">
                  <ProviderActions 
                    provider={provider}
                    onSelectProvider={onSelectProvider}
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
