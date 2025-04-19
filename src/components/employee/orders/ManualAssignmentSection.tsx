
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search, Send, MapPin } from "lucide-react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProvidersMapView } from "../providers/ProvidersMapView"

interface ManualAssignmentSectionProps {
  order: {
    id: string
    status: string
    pickupLocation: string
  }
  onResearchProviders: () => void
  onManualAssign: (providerId: string) => void
}

export const ManualAssignmentSection = ({ 
  order, 
  onResearchProviders, 
  onManualAssign 
}: ManualAssignmentSectionProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [providerId, setProviderId] = useState("")
  const [mapOpen, setMapOpen] = useState(false)
  
  // Only show for NPF or NPA status
  if (order.status !== 'NPA' && order.status !== 'NPF') {
    return null
  }

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Provider Assignment Options</h3>
      
      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={onResearchProviders}
        >
          <Search className="mr-2 h-4 w-4" />
          Research for Provider
        </Button>
        
        <div className="flex items-center gap-2">
          <Input
            placeholder="Provider ID or Phone"
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
            className="flex-1"
          />
          <Button 
            variant="secondary" 
            onClick={() => providerId && onManualAssign(providerId)}
            disabled={!providerId}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Request
          </Button>
        </div>
        
        <Dialog open={mapOpen} onOpenChange={setMapOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <MapPin className="mr-2 h-4 w-4" />
              Show Close Providers
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Nearby Providers</DialogTitle>
            </DialogHeader>
            <div className="h-full">
              <ProvidersMapView 
                centerAddress={order.pickupLocation}
                radiusKm={7}
                onProviderSelect={(provider) => {
                  onManualAssign(provider.id);
                  setMapOpen(false);
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
