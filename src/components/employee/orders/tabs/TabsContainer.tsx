
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'

interface TabsContainerProps {
  activeTab: string
  setActiveTab: (value: string) => void
  notesTab: ReactNode
  detailsTab: ReactNode
  timeTab: ReactNode
  providerTab: ReactNode
  externalNotesTab: ReactNode
  invoiceTab: ReactNode
  infoTab: ReactNode
}

export const TabsContainer = ({
  activeTab,
  setActiveTab,
  notesTab,
  detailsTab,
  timeTab,
  providerTab,
  externalNotesTab,
  invoiceTab,
  infoTab
}: TabsContainerProps) => {
  return (
    <Tabs defaultValue="notes" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-7 w-full md:w-auto">
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="time">Time</TabsTrigger>
        <TabsTrigger value="provider">Provider</TabsTrigger>
        <TabsTrigger value="external-notes">External Notes</TabsTrigger>
        <TabsTrigger value="invoice">Invoice</TabsTrigger>
        <TabsTrigger value="info">Info</TabsTrigger>
      </TabsList>
      
      <TabsContent value="notes">{notesTab}</TabsContent>
      <TabsContent value="details" className="space-y-6">{detailsTab}</TabsContent>
      <TabsContent value="time">{timeTab}</TabsContent>
      <TabsContent value="provider">{providerTab}</TabsContent>
      <TabsContent value="external-notes">{externalNotesTab}</TabsContent>
      <TabsContent value="invoice">{invoiceTab}</TabsContent>
      <TabsContent value="info">{infoTab}</TabsContent>
    </Tabs>
  )
}
