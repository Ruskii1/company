
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Order } from "@/types/order"
import { toast } from "sonner"

interface InvoiceTabProps {
  order?: Order
}

export const InvoiceTab = ({ order }: InvoiceTabProps) => {
  // Mock invoice data
  const invoice = order ? {
    invoiceNumber: `INV-${order.taskId}`,
    issueDate: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString(),
    amount: 250,
    tax: 37.5,
    total: 287.5,
    status: 'Unpaid',
    items: [
      {
        description: order.serviceType,
        quantity: 1,
        unitPrice: 250,
        total: 250
      }
    ]
  } : null
  
  const handleDownload = () => {
    toast.success("Invoice downloaded successfully")
  }
  
  const handleSendInvoice = () => {
    toast.success("Invoice sent to customer via email")
  }
  
  if (!invoice) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No invoice available for this order</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Invoice
        </CardTitle>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button size="sm" onClick={handleSendInvoice}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <h3 className="font-semibold text-lg">Invoice #{invoice.invoiceNumber}</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Issue Date:</span> {invoice.issueDate}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Due Date:</span> {invoice.dueDate}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <div className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-800 font-medium text-sm">
                {invoice.status}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Order Details</h4>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-right">Unit Price</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{item.description}</td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${invoice.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Tax (15%)</span>
              <span>${invoice.tax.toFixed(2)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Payment Information</h4>
            <p className="text-sm">
              Please make payment to:
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Bank Account:</span> XXXX-XXXX-XXXX-1234
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Bank Name:</span> Example Bank
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
