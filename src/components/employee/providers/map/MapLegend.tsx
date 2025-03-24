
import React from 'react';
import { CircleDot, CircleOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ServiceProvider } from '@/types/provider';

interface MapLegendProps {
  filteredProviders: ServiceProvider[];
}

const MapLegend: React.FC<MapLegendProps> = ({ filteredProviders }) => {
  return (
    <div className="absolute bottom-4 left-4 z-10 bg-white/90 p-4 rounded-lg shadow-md w-72 space-y-3 backdrop-blur-sm">
      {/* Status indicators */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium">Map Legend:</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Online Providers ({filteredProviders.filter(p => p.availabilityStatus === 'online').length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          <span className="text-sm">Offline Providers ({filteredProviders.filter(p => p.availabilityStatus === 'offline').length})</span>
        </div>
      </div>
      
      {/* Provider count */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
        <Badge variant="secondary" className="text-xs">
          {filteredProviders.length} Providers
        </Badge>
        <div className="flex gap-1">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <CircleDot className="h-3 w-3 text-green-500" />
            {filteredProviders.filter(p => p.availabilityStatus === 'online').length}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <CircleOff className="h-3 w-3 text-slate-400" />
            {filteredProviders.filter(p => p.availabilityStatus === 'offline').length}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
