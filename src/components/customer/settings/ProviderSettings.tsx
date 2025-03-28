
import { useState } from "react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2, Link } from "lucide-react"

// Mock data for providers
const mockProviders = [
  { id: "1", name: "Express Logistics", status: "active", lastUsed: "2023-06-15" },
  { id: "2", name: "Swift Delivery", status: "inactive", lastUsed: "2023-04-22" },
  { id: "3", name: "GlobalTrans", status: "active", lastUsed: "2023-05-30" },
]

export function ProviderSettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [providers, setProviders] = useState(mockProviders)
  
  const handleToggleProvider = (id: string) => {
    setProviders(prevProviders => 
      prevProviders.map(provider => 
        provider.id === id 
          ? { ...provider, status: provider.status === "active" ? "inactive" : "active" } 
          : provider
      )
    )
    
    const provider = providers.find(p => p.id === id)
    toast({
      title: provider?.status === "active" ? t.customer.settings.providers.providerDeactivated : t.customer.settings.providers.providerActivated,
      description: provider?.status === "active" 
        ? `${provider.name} ${t.customer.settings.providers.hasBeenDeactivated}`
        : `${provider.name} ${t.customer.settings.providers.hasBeenActivated}`,
    })
  }
  
  const handleDeleteProvider = (id: string) => {
    const provider = providers.find(p => p.id === id)
    setProviders(prevProviders => prevProviders.filter(provider => provider.id !== id))
    
    toast({
      title: t.customer.settings.providers.providerRemoved,
      description: `${provider?.name} ${t.customer.settings.providers.hasBeenRemovedFromYourAccount}`,
    })
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.customer.settings.providers.manageProviders}</h3>
        <p className="text-sm text-muted-foreground">
          {t.customer.settings.providers.configureServiceProvidersForYourAccount}
        </p>
      </div>
      
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t.customer.settings.providers.addProvider}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t.customer.settings.providers.addNewProvider}</SheetTitle>
              <SheetDescription>
                {t.customer.settings.providers.connectToANewServiceProvider}
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              {/* Form for adding new provider would go here */}
              <p className="text-sm text-muted-foreground mb-4">
                {t.customer.settings.providers.providerSelectionInstructions}
              </p>
              <Button className="w-full" onClick={() => {
                toast({
                  title: t.customer.settings.providers.providerAdded,
                  description: t.customer.settings.providers.newProviderHasBeenAddedToYourAccount,
                })
              }}>
                {t.customer.settings.providers.connectProvider}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            {t.customer.settings.providers.connectedProviders}
          </CardTitle>
          <CardDescription>
            {t.customer.settings.providers.servicesYouveAuthorizedToAccessYourAccount}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.customer.settings.providers.providerName}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.customer.settings.providers.lastUsed}</TableHead>
                <TableHead className="text-right">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>
                    <Badge variant={provider.status === "active" ? "default" : "secondary"}>
                      {provider.status === "active" ? t.customer.settings.providers.active : t.customer.settings.providers.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell>{provider.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Switch 
                        checked={provider.status === "active"} 
                        onCheckedChange={() => handleToggleProvider(provider.id)} 
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDeleteProvider(provider.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
