
import mapboxgl from 'mapbox-gl';
import { ServiceProvider } from '@/types/provider';

// Create popup for a provider marker
export const createProviderPopup = (provider: ServiceProvider): mapboxgl.Popup => {
  return new mapboxgl.Popup({ 
    offset: 25, 
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px'
  })
  .setHTML(`
    <div style="padding: 16px; min-width: 250px; font-family: system-ui, sans-serif;">
      <h3 style="margin-bottom: 12px; font-weight: bold; font-size: 18px; color: #111827; background-color: ${provider.availabilityStatus === 'online' ? '#ecfdf5' : '#f1f5f9'}; padding: 8px; border-radius: 6px; text-align: center;">
        ${provider.fullName}
      </h3>
      <div style="display: flex; flex-direction: column; gap: 10px; background-color: white; padding: 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <p style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: #4b5563; font-size: 14px;">Phone:</span>
          <span style="color: #111827; font-weight: 500; font-size: 14px; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${provider.phoneNumber}</span>
        </p>
        <p style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: #4b5563; font-size: 14px;">Status:</span>
          <span style="color: white; font-weight: bold; font-size: 14px; background-color: ${provider.availabilityStatus === 'online' ? '#16a34a' : '#64748b'}; padding: 4px 8px; border-radius: 4px;">
            ${provider.availabilityStatus === 'online' ? 'Online' : 'Offline'}
          </span>
        </p>
        <p style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: #4b5563; font-size: 14px;">Region:</span>
          <span style="color: #111827; font-weight: 500; font-size: 14px; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${provider.region}</span>
        </p>
        <div style="margin: 0; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 8px;">
          <span style="font-weight: 600; color: #4b5563; display: block; margin-bottom: 6px; font-size: 14px;">Services:</span>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${provider.serviceTypes.map(service => 
              `<span style="color: #111827; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">${service}</span>`
            ).join('')}
          </div>
        </div>
      </div>
      <div style="margin-top: 12px; font-size: 12px; color: #6b7280; text-align: center;">
        Click marker to show/hide this information
      </div>
    </div>
  `);
};
