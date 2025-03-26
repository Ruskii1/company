
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProviderLocation {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  updated_at?: string;
}

export function useProviderLocation(providerId: string | undefined) {
  const [location, setLocation] = useState<ProviderLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerId) {
      setLoading(false);
      return;
    }

    async function fetchInitialLocation() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('providers_location')
          .select('*')
          .eq('provider_id', providerId)
          .single();
        
        if (error) {
          console.error('Error fetching provider location:', error);
          // If it's just that no location exists yet, don't show an error
          if (error.code !== 'PGRST116') {
            setError(error.message);
          }
          
          // Default location if none exists (center of Saudi Arabia)
          setLocation({
            lat: 24.7136,
            lng: 46.6753,
          });
        } else if (data) {
          setLocation({
            lat: data.lat,
            lng: data.lng,
            heading: data.heading,
            speed: data.speed,
            updated_at: data.updated_at,
          });
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Failed to fetch provider location');
      } finally {
        setLoading(false);
      }
    }

    // Initial fetch
    fetchInitialLocation();

    // Set up real-time subscription
    const channel = supabase
      .channel('provider-location-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'providers_location',
          filter: `provider_id=eq.${providerId}`,
        },
        (payload) => {
          console.log('Received location update:', payload);
          if (payload.new) {
            const newData = payload.new as any;
            setLocation({
              lat: newData.lat,
              lng: newData.lng,
              heading: newData.heading,
              speed: newData.speed,
              updated_at: newData.updated_at,
            });
          }
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [providerId]);

  return { location, loading, error };
}
