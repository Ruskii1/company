
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'
import { FileText, UserCircle, Clock, Car, FileSpreadsheet, Info, MessageSquare } from 'lucide-react'

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
  actionLogTab?: ReactNode
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
  infoTab,
  actionLogTab
}: TabsContainerProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full">
        <TabsTrigger value="notes" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Internal Notes</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          <span className="hidden md:inline">Details</span>
        </TabsTrigger>
        <TabsTrigger value="time" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="hidden md:inline">Time Tracking</span>
        </TabsTrigger>
        <TabsTrigger value="provider" className="flex items-center gap-2">
          <Car className="h-4 w-4" />
          <span className="hidden md:inline">Provider</span>
        </TabsTrigger>
        <TabsTrigger value="externalNotes" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden md:inline">External Notes</span>
        </TabsTrigger>
        <TabsTrigger value="invoice" className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          <span className="hidden md:inline">Invoice</span>
        </TabsTrigger>
        <TabsTrigger value="info" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span className="hidden md:inline">Info</span>
        </TabsTrigger>
        {actionLogTab && (
          <TabsTrigger value="actionLog" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden md:inline">Action Log</span>
          </TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="notes">
        {notesTab}
      </TabsContent>
      
      <TabsContent value="details">
        {detailsTab}
      </TabsContent>
      
      <TabsContent value="time">
        {timeTab}
      </TabsContent>
      
      <TabsContent value="provider">
        {providerTab}
      </TabsContent>
      
      <TabsContent value="externalNotes">
        {externalNotesTab}
      </TabsContent>
      
      <TabsContent value="invoice">
        {invoiceTab}
      </TabsContent>
      
      <TabsContent value="info">
        {infoTab}
      </TabsContent>
      
      {actionLogTab && (
        <TabsContent value="actionLog">
          {actionLogTab}
        </TabsContent>
      )}
    </Tabs>
  )
}
