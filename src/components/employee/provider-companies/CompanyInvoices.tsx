
import { useState } from 'react'
import { Search, Calendar, Download, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProviderCompany } from '@/types/corporate'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from 'sonner'

interface CompanyInvoicesProps {
  company: ProviderCompany
}

export function CompanyInvoices({ company }: CompanyInvoicesProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [invoiceType, setInvoiceType] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  
  // Mock invoices generated from the company data
  const invoices = company.providers.flatMap(provider => 
    provider.orders
      .filter(order => order.status === 'Completed')
      .map((order, index) => ({
        id: `INV-${order.taskId}-${index + 1}`,
        requestId: order.taskId,
        date: order.date,
        dueDate: new Date(new Date(order.date).getTime() + 30*24*60*60*1000).toISOString(),
        providerId: provider.id,
        providerName: provider.fullName,
        customerName: order.customerName,
        amount: order.amount,
        status: Math.random() > 0.3 ? 'Paid' : 'Pending',
        type: ['Company', 'Provider', 'Customer'][Math.floor(Math.random() * 3)]
      }))
  )
  
  // Get unique invoice types
  const invoiceTypes = Array.from(new Set(invoices.map(invoice => invoice.type)))
  
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = invoiceType === 'all' || invoice.type === invoiceType
    
    let matchesDate = true
    const invoiceDate = new Date(invoice.date)
    const now = new Date()
    
    if (dateRange === 'this_month') {
      const thisMonth = now.getMonth()
      const thisYear = now.getFullYear()
      matchesDate = invoiceDate.getMonth() === thisMonth && invoiceDate.getFullYear() === thisYear
    } else if (dateRange === 'last_month') {
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
      const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
      matchesDate = invoiceDate.getMonth() === lastMonth && invoiceDate.getFullYear() === lastMonthYear
    } else if (dateRange === 'this_year') {
      matchesDate = invoiceDate.getFullYear() === now.getFullYear()
    }
    
    return matchesSearch && matchesType && matchesDate
  })
  
  // Sort by date, newest first
  const sortedInvoices = [...filteredInvoices].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  const handleDownload = (invoiceId: string, selectedType: string = 'all') => {
    toast.success(`Invoice ${invoiceId} downloaded as ${selectedType} invoice`, {
      description: "The invoice has been downloaded to your device"
    })
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={invoiceType} onValueChange={setInvoiceType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Invoice type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {invoiceTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
            <SelectItem value="last_month">Last Month</SelectItem>
            <SelectItem value="this_year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Invoice Type</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No invoices found
                </TableCell>
              </TableRow>
            ) : (
              sortedInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      {invoice.id}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.type}</Badge>
                  </TableCell>
                  <TableCell>{invoice.providerName}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={invoice.status === 'Paid' ? 'default' : 'secondary'}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="grid gap-2">
                          <h4 className="font-medium leading-none mb-2">Download as</h4>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handleDownload(invoice.id, 'Company')}
                          >
                            Company Invoice
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handleDownload(invoice.id, 'Provider')}
                          >
                            Provider Invoice
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handleDownload(invoice.id, 'Customer')}
                          >
                            Customer Invoice
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
