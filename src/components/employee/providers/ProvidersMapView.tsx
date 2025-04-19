import React from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceProvider } from '@/types/provider'; // Make sure this import exists

interface ProvidersMapViewProps {
  providers: ServiceProvider[];
  onProviderSelect?: (provider: ServiceProvider) => void;
}

export const ProvidersMapView: React.FC<ProvidersMapViewProps> = ({ 
  providers, 
  onProviderSelect 
}) => {
  const [selectedProvider, setSelectedProvider] = React.useState<ServiceProvider | null>(null);
  const [viewport, setViewport] = React.useState({
    latitude: 24.7136,
    longitude: 46.6753,
    zoom: 10
  });

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="600px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {providers.map((provider) => (
        <Marker
          key={provider.id}
          latitude={provider.location.lat}
          longitude={provider.location.lng}
          onClick={() => {
            setSelectedProvider(provider);
            onProviderSelect?.(provider);
          }}
        >
          <div className="bg-primary text-white p-2 rounded-full cursor-pointer">
            <span className="text-xs">{provider.name.charAt(0)}</span>
          </div>
        </Marker>
      ))}

      {selectedProvider && (
        <Popup
          latitude={selectedProvider.location.lat}
          longitude={selectedProvider.location.lng}
          onClose={() => setSelectedProvider(null)}
        >
          <div>
            <h3>{selectedProvider.name}</h3>
            <p>Rating: {selectedProvider.rating}</p>
            <p>Completed Orders: {selectedProvider.completedOrders}</p>
          </div>
        </Popup>
      )}
    </MapGL>
  );
};
