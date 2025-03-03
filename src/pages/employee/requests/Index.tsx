
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar, Clock, Filter, History, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const requestFilterSchema = z.object({
  requestNumber: z.string().optional()
})

type RequestFilterValues = z.infer<typeof requestFilterSchema>

const AllRequestsPage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('today')
  
  const form = useForm<RequestFilterValues>({
    resolver: zodResolver(requestFilterSchema),
    defaultValues: {
      requestNumber: ''
    }
  })

  const onSubmit = (data: RequestFilterValues) => {
    console.log('Filtering by request number:', data.requestNumber)
    // Here you would implement the actual filtering logic
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.allRequests}</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="requestNumber"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2">
                  <FormLabel className="whitespace-nowrap">{t.requestNumber || "Request #"}:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder={t.enterRequestNumber || "Enter request number"} 
                        className="pr-8" 
                        {...field} 
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="past" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              {t.pastRequests}
            </TabsTrigger>
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t.todaysRequests}
            </TabsTrigger>
            <TabsTrigger value="future" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t.futureRequests}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="past" className="space-y-4">
            <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
              <h3 className="font-medium text-lg mb-2">{t.pastRequests}</h3>
              <p className="text-gray-500 dark:text-gray-300">{t.noPastRequests}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="today" className="space-y-4">
            <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
              <h3 className="font-medium text-lg mb-2">{t.todaysRequests}</h3>
              <p className="text-gray-500 dark:text-gray-300">{t.noTodayRequests}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="future" className="space-y-4">
            <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
              <h3 className="font-medium text-lg mb-2">{t.futureRequests}</h3>
              <p className="text-gray-500 dark:text-gray-300">{t.noFutureRequests}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default AllRequestsPage
