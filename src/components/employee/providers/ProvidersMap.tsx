
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useServiceProviders } from '@/hooks/useServiceProviders'
import { ServiceProvider } from '@/types/provider'
import { CircleDot, CircleOff, MapPin, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguageStore, translations } from '@/lib/i18n'

// Define map token - in a real app, this would come from environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xvdmFibGVhcHAifQ.eCt6U_V-5lYPtYRXD_m9DQ'

const ProvidersMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({})
  const { allProviders } = useServiceProviders()
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([])
  const [filter, setFilter] = useState({
    status: 'all',
    search: '',
    serviceType: 'all',
  })
  const [mapLoaded, setMapLoaded] = useState(false)
  const { language } = useLanguageStore()
  const t = translations[language]

  // Get unique service types from providers
  const serviceTypes = Array.from(
    new Set(allProviders.flatMap(provider => provider.serviceTypes))
  )

  // Filter providers based on user selections
  useEffect(() => {
    let result = [...allProviders]
    
    if (filter.status !== 'all') {
      result = result.filter(provider => 
        filter.status === 'online' 
          ? provider.availabilityStatus === 'online'
          : provider.availabilityStatus === 'offline'
      )
    }
    
    if (filter.serviceType !== 'all') {
      result = result.filter(provider => 
        provider.serviceTypes.includes(filter.serviceType)
      )
    }
    
    if (filter.search) {
      const searchLower = filter.search.toLowerCase()
      result = result.filter(provider => 
        provider.fullName.toLowerCase().includes(searchLower) ||
        provider.phoneNumber.includes(filter.search)
      )
    }
    
    setFilteredProviders(result)
  }, [allProviders, filter])

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [45.0792, 23.8859], // Center on Saudi Arabia
      zoom: 5,
      attributionControl: false
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }))

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Add markers for service providers
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove())
    markersRef.current = {}

    // Random locations in Saudi Arabia for demo purposes
    // In a real app, these would come from the provider data
    const saudiCities = [
      { name: 'Riyadh', coordinates: [46.6753, 24.7136] },
      { name: 'Jeddah', coordinates: [39.1925, 21.4858] },
      { name: 'Mecca', coordinates: [39.8579, 21.3891] },
      { name: 'Medina', coordinates: [39.6142, 24.5247] },
      { name: 'Dammam', coordinates: [50.1033, 26.4207] },
      { name: 'Taif', coordinates: [40.4168, 21.2570] },
    ]

    // Add markers for each provider
    filteredProviders.forEach((provider, index) => {
      // For demo: assign providers to random cities
      const cityIndex = index % saudiCities.length
      const randomOffset = () => (Math.random() - 0.5) * 0.5 // Small random offset for visual separation
      const lngLat = [
        saudiCities[cityIndex].coordinates[0] + randomOffset(),
        saudiCities[cityIndex].coordinates[1] + randomOffset()
      ] as [number, number]

      // Create HTML element for marker
      const markerEl = document.createElement('div')
      markerEl.className = 'provider-marker'
      markerEl.style.width = '30px'
      markerEl.style.height = '30px'
      markerEl.style.borderRadius = '50%'
      markerEl.style.display = 'flex'
      markerEl.style.alignItems = 'center'
      markerEl.style.justifyContent = 'center'
      markerEl.style.backgroundColor = provider.availabilityStatus === 'online' 
        ? 'rgba(34, 197, 94, 0.8)' // green for online
        : 'rgba(148, 163, 184, 0.8)' // gray for offline
      markerEl.style.border = '2px solid white'
      markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'
      markerEl.style.cursor = 'pointer'
      
      // Add initials
      const initials = provider.fullName.split(' ')
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join('')
      markerEl.innerHTML = `<span style="color: white; font-weight: bold; font-size: 12px;">${initials}</span>`

      // Create and add the marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(lngLat)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px;">
                <h3 style="margin-bottom: 8px; font-weight: bold;">${provider.fullName}</h3>
                <p style="margin-bottom: 4px;"><strong>Phone:</strong> ${provider.phoneNumber}</p>
                <p style="margin-bottom: 4px;"><strong>Status:</strong> ${provider.availabilityStatus}</p>
                <p style="margin-bottom: 4px;"><strong>Region:</strong> ${provider.region}</p>
                <p><strong>Services:</strong> ${provider.serviceTypes.join(', ')}</p>
              </div>
            `)
        )
        .addTo(map.current!)

      markersRef.current[provider.id] = marker
    })

    // Adjust map bounds to fit all markers if there are any
    if (filteredProviders.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      
      Object.values(markersRef.current).forEach(marker => {
        bounds.extend(marker.getLngLat())
      })
      
      map.current.fitBounds(bounds, {
        padding: 70,
        maxZoom: 15,
        duration: 1000
      })
    }
  }, [filteredProviders, mapLoaded])

  return (
    <Card className="w-full h-[calc(100vh-150px)]">
      <CardContent className="p-0 relative">
        {/* Controls overlay */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 p-4 rounded-lg shadow-md w-72 space-y-3 backdrop-blur-sm">
          <div className="text-lg font-semibold mb-2">Provider Map</div>
          
          {/* Search */}
          <div className="relative">
            <Input 
              placeholder="Search by name or phone"
              className="pr-8"
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              onClick={() => {}}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Status filter */}
          <div>
            <Select 
              value={filter.status}
              onValueChange={(value) => setFilter({...filter, status: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Provider Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="online">Online Only</SelectItem>
                <SelectItem value="offline">Offline Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Service Type filter */}
          <div>
            <Select 
              value={filter.serviceType}
              onValueChange={(value) => setFilter({...filter, serviceType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type || "unknown_service"}>
                    {type || "Unknown"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Status indicators */}
          <div className="flex flex-col gap-2 mt-2">
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
        
        {/* Map container */}
        <div ref={mapContainer} className="w-full h-full min-h-[600px]" />
      </CardContent>
    </Card>
  )
}

export default ProvidersMap
