
import { ServiceProvider } from '@/types/provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ServiceTypeBadges } from './list/ServiceTypeBadges';
import { StatusBadge } from './list/StatusBadge';
import { ProviderActions } from './list/ProviderActions';
import { DetailsBadge } from './list/DetailsBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProvidersListProps {
  providers: ServiceProvider[];
  onSelectProvider: (id: string) => void;
}

export function ProvidersList({ providers, onSelectProvider }: ProvidersListProps) {
  return (
    <ScrollArea className="rounded-md border bg-white dark:bg-gray-800">
      <Table>
        <TableHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10">
          <TableRow>
            <TableHead className="w-[250px]">Provider</TableHead>
            <TableHead>Region</TableHead>
            <TableHead className="hidden md:table-cell">Service Types</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Commission</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No providers found
              </TableCell>
            </TableRow>
          ) : (
            providers.map((provider) => (
              <TableRow key={provider.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={provider.profilePhoto} alt={provider.fullName} />
                      <AvatarFallback>{provider.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{provider.fullName}</div>
                      <div className="text-xs text-muted-foreground">{provider.phoneNumber}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{provider.region}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <ServiceTypeBadges serviceTypes={provider.serviceTypes} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col gap-1">
                    <StatusBadge status={provider.status} />
                    <DetailsBadge provider={provider} />
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{provider.commissionPercentage}%</TableCell>
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
    </ScrollArea>
  );
}
