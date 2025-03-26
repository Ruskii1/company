
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface ProviderLocation {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  updated_at?: string;
}

export interface ProviderLocationState {
  location: ProviderLocation | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

/**
 * Hook to fetch and subscribe to a provider's real-time location
 * @param providerId The ID of the service provider
 * @returns Location data, loading state, and error information
 */
export function useProviderLocation(providerId: string | undefined) {
  const [state, setState] = useState<ProviderLocationState>({
    location: null,
    loading: Boolean(providerId),
    error: null,
    lastUpdated: null,
  });

  useEffect(() => {
    if (!providerId) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    console.log(`Fetching location data for provider: ${providerId}`);
    let channel: RealtimeChannel;

    // Initial fetch function
    const fetchInitialLocation = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const { data, error } = await supabase
          .from('providers_location')
          .select('*')
          .eq('provider_id', providerId)
          .single();
        
        if (error) {
          console.error('Error fetching provider location:', error);
          // If it's just that no location exists yet, don't show an error to the user
          if (error.code !== 'PGRST116') {
            setState(prev => ({ 
              ...prev, 
              error: error.message,
              loading: false
            }));
          } else {
            // No data found, use default location in Riyadh, Saudi Arabia
            setState(prev => ({
              ...prev,
              location: {
                lat: 24.7136,
                lng: 46.6753,
              },
              loading: false
            }));
          }
        } else if (data) {
          console.log('Got initial location data:', data);
          const timestamp = new Date().toISOString();
          setState(prev => ({
            ...prev,
            location: {
              lat: data.lat,
              lng: data.lng,
              heading: data.heading,
              speed: data.speed,
              updated_at: data.updated_at,
            },
            loading: false,
            lastUpdated: timestamp
          }));
        }
      } catch (err) {
        console.error('Unexpected error in location fetch:', err);
        setState(prev => ({
          ...prev,
          error: 'Failed to fetch provider location',
          loading: false,
          // Fallback to default location in Riyadh, Saudi Arabia
          location: {
            lat: 24.7136,
            lng: 46.6753,
          }
        }));
      }
    };

    // Initial fetch
    fetchInitialLocation();

    // Set up real-time subscription
    console.log(`Setting up real-time subscription for provider: ${providerId}`);
    channel = supabase
      .channel(`provider-location-${providerId}`)
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
            const timestamp = new Date().toISOString();
            setState(prev => ({
              ...prev,
              location: {
                lat: newData.lat,
                lng: newData.lng,
                heading: newData.heading,
                speed: newData.speed,
                updated_at: newData.updated_at,
              },
              lastUpdated: timestamp
            }));
          }
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status: ${status}`);
        // Fix: This is the corrected way to check subscription error
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to location updates');
        } else if (status === 'CHANNEL_ERROR') {
          setState(prev => ({
            ...prev,
            error: 'Failed to subscribe to location updates'
          }));
        }
      });

    // Cleanup subscription
    return () => {
      console.log(`Removing channel for provider: ${providerId}`);
      supabase.removeChannel(channel);
    };
  }, [providerId]);

  return state;
}
