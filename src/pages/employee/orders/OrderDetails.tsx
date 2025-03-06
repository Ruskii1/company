import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MapPin, Clock, Camera, Car, User, Calendar, Briefcase, Check, X, MessageCircle, FileText, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface Note {
  id: string
  sender: 'customer' | 'employee'
  message: string
  timestamp: string
  senderName: string
}

interface InternalNote {
  id: string
  message: string
  timestamp: string
  employeeName: string
}

interface Order {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes?: string
  acceptedBy?: string
  declinedBy?: string[]
  pendingProviders?: string[]
  timeTracking: {
    acceptedAt: string
    inRouteAt: string
    inServiceAt: string
    dropoffAt: string
  }
  provider: {
    name: string
    phone: string
    rating: number
    corporationName: string
    images: {
      pickup: string[]
      dropoff: string[]
    }
    location: {
      lat: number
      lng: number
    }
  }
  car: {
    plate: string
    model: string
    name: string
    vin: string
  }
  conversation: Note[]
  internalNotes: InternalNote[]
}

const OrderDetails = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('notes')
  const [newNote, setNewNote] = useState('')
  const [newInternalNote, setNewInternalNote] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      const mockOrder: Order = {
        id: '1001',
        taskId: '2023-001',
        customerName: 'Acme Corporation',
        serviceType: 'Package Delivery',
        pickupTime: '2023-06-15 09:00 AM',
        pickupLocation: '123 Business Ave, Tower A',
        dropoffLocation: '456 Commerce St, Suite 300',
        status: 'Completed',
        notes: 'Handle with care. Fragile items inside.',
        acceptedBy: 'John Doe',
        declinedBy: ['Sarah Smith', 'Michael Brown', 'Jane Wilson'],
        pendingProviders: ['Alex Johnson', 'David Miller', 'Emma Thompson'],
        timeTracking: {
          acceptedAt: '2023-06-15 08:45 AM',
          inRouteAt: '2023-06-15 08:50 AM',
          inServiceAt: '2023-06-15 09:05 AM',
          dropoffAt: '2023-06-15 10:00 AM'
        },
        provider: {
          name: 'John Doe',
          phone: '+1 (555) 123-4567',
          rating: 4.8,
          corporationName: 'Express Delivery Inc.',
          images: {
            pickup: [
              '/placeholder.svg',
              '/placeholder.svg',
              '/placeholder.svg',
              '/placeholder.svg'
            ],
            dropoff: [
              '/placeholder.svg',
              '/placeholder.svg',
              '/placeholder.svg',
              '/placeholder.svg'
            ]
          },
          location: {
            lat: 37.7749,
            lng: -122.4194
          }
        },
        car: {
          plate: 'ABC-1234',
          model: 'Toyota Camry',
          name: 'Sedan',
          vin: '1HGCM82633A123456'
        },
        conversation: [
          {
            id: '1',
            sender: 'customer',
            message: 'Hi, could you please make sure the package is delivered before noon?',
            timestamp: '2023-06-14 10:15 AM',
            senderName: 'Acme Corporation'
          },
          {
            id: '2',
            sender: 'employee',
            message: 'Yes, we\'ve scheduled it for 9:00 AM delivery. Our driver will call you 30 minutes before arrival.',
            timestamp: '2023-06-14 10:20 AM',
            senderName: 'Support Team'
          },
          {
            id: '3',
            sender: 'customer',
            message: 'Great, thank you! Is there any way to track the delivery?',
            timestamp: '2023-06-14 10:25 AM',
            senderName: 'Acme Corporation'
          },
          {
            id: '4',
            sender: 'employee',
            message: 'You\'ll receive a tracking link via email once the driver picks up your package. You can also check status updates in your account dashboard.',
            timestamp: '2023-06-14 10:30 AM',
            senderName: 'Support Team'
          }
        ],
        internalNotes: [
          {
            id: '1',
            message: 'Customer is a VIP client, please prioritize this delivery.',
            timestamp: '2023-06-14 09:00 AM',
            employeeName: 'Maria Johnson'
          },
          {
            id: '2',
            message: 'Previous deliveries to this address had access issues. Code for the building is #4321.',
            timestamp: '2023-06-14 09:30 AM',
            employeeName: 'Robert Chen'
          }
        ]
      }
      
      setOrder(mockOrder)
      setLoading(false)
    }, 500)
  }, [taskId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-500">{status}</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-500">{status}</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-500 text-black">{status}</Badge>
      case 'Scheduled':
        return <Badge className="bg-purple-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  const handleSendNote = () => {
    if (!newNote.trim() || !order) return;

    const newNoteObj: Note = {
      id: Date.now().toString(),
      sender: 'employee',
      message: newNote.trim(),
      timestamp: new Date().toLocaleString(),
      senderName: 'Support Team'
    };

    setOrder({
      ...order,
      conversation: [...order.conversation, newNoteObj]
    });

    setNewNote('');
    
    toast({
      title: "Note sent",
      description: "Your message has been added to the conversation",
    });
  }

  const handleSaveInternalNote = () => {
    if (!newInternalNote.trim() || !order) return;

    const newInternalNoteObj: InternalNote = {
      id: Date.now().toString(),
      message: newInternalNote.trim(),
      timestamp: new Date().toLocaleString(),
      employeeName: 'Current Employee'
    };

    setOrder({
      ...order,
      internalNotes: [...order.internalNotes, newInternalNoteObj]
    });

    setNewInternalNote('');
    
    toast({
      title: "Internal note saved",
      description: "Your note has been added to the order",
    });
  }

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!order) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="text-center">
            <p>Order not found</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/employee')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t.orderManagement}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/employee')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.orderManagement}
        </Button>
        <div>
          <CardTitle className="text-2xl">{t.taskId}: {order.taskId}</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {t.status}: {getStatusBadge(order.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="notes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full md:w-auto">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
            <TabsTrigger value="car">Car Details</TabsTrigger>
            <TabsTrigger value="external-notes">External Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Internal Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {order.internalNotes.map((note) => (
                    <div 
                      key={note.id}
                      className="p-3 rounded-lg border-l-4 border-primary bg-muted"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm">
                          {note.employeeName}
                        </span>
                        <span className="text-xs text-gray-500">{note.timestamp}</span>
                      </div>
                      <p className="text-sm">{note.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add internal notes about this order (not visible to customer)..."
                    className="min-h-[100px]"
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSaveInternalNote} disabled={!newInternalNote.trim()}>
                      Save Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.customerName}</h3>
                  <p>{order.customerName}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto mt-1"
                    onClick={() => navigate(`/employee/customers/${order.id}`)}
                  >
                    View Customer Details
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.serviceType}</h3>
                  <p>{order.serviceType}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.pickupTime}</h3>
                  <p>{order.pickupTime}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Accepted By
                  </h3>
                  <p>{order.acceptedBy || 'N/A'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    Declined By
                  </h3>
                  {order.declinedBy && order.declinedBy.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {order.declinedBy.map((provider, index) => (
                        <li key={index}>{provider}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>None</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    Pending Response
                  </h3>
                  {order.pendingProviders && order.pendingProviders.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {order.pendingProviders.map((provider, index) => (
                        <li key={index}>{provider}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>None</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.pickupLocation}</h3>
                  <div className="flex items-center gap-2">
                    <p>{order.pickupLocation}</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openInGoogleMaps(order.pickupLocation)}
                      className="h-8 w-8"
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.dropoffLocation}</h3>
                  <div className="flex items-center gap-2">
                    <p>{order.dropoffLocation}</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openInGoogleMaps(order.dropoffLocation)}
                      className="h-8 w-8"
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>
                </div>
                
                {order.notes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t.notes}</h3>
                    <p>{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="time">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Pickup Time</TableCell>
                      <TableCell>{order.pickupTime}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Order Accepted</TableCell>
                      <TableCell>{order.timeTracking.acceptedAt}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">In Route</TableCell>
                      <TableCell>{order.timeTracking.inRouteAt}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">In Service</TableCell>
                      <TableCell>{order.timeTracking.inServiceAt}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dropoff Time</TableCell>
                      <TableCell>{order.timeTracking.dropoffAt}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="provider">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold mb-1">Provider Name</p>
                    <p>{order.provider.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Phone</p>
                    <p>{order.provider.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Rating</p>
                    <p>{order.provider.rating} / 5.0</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1 flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      Corporation
                    </p>
                    <p>{order.provider.corporationName}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Pickup Photos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {order.provider.images.pickup.map((imageUrl, index) => (
                        <div key={`pickup-${index}`} className="aspect-square relative border rounded-md overflow-hidden">
                          <img 
                            src={imageUrl} 
                            alt={`Pickup ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Dropoff Photos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {order.provider.images.dropoff.map((imageUrl, index) => (
                        <div key={`dropoff-${index}`} className="aspect-square relative border rounded-md overflow-hidden">
                          <img 
                            src={imageUrl} 
                            alt={`Dropoff ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Live Location
                  </h3>
                  <div className="border rounded-md h-64 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Live map location would display here</p>
                    <p className="text-sm text-gray-400">
                      Current position: {order.provider.location.lat}, {order.provider.location.lng}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="car">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">License Plate</TableCell>
                      <TableCell>{order.car.plate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Model</TableCell>
                      <TableCell>{order.car.model}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Type</TableCell>
                      <TableCell>{order.car.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">VIN Number</TableCell>
                      <TableCell className="font-mono">{order.car.vin}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="external-notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Conversation History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {order.conversation.map((note) => (
                    <div 
                      key={note.id}
                      className={`p-3 rounded-lg ${
                        note.sender === 'customer' 
                          ? 'bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 ml-auto mr-0' 
                          : 'bg-green-50 dark:bg-green-950 border-l-4 border-green-500 mr-auto ml-0'
                      } max-w-[80%]`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm">
                          {note.senderName} 
                          <span className="ml-2 text-xs font-normal text-gray-500">
                            ({note.sender})
                          </span>
                        </span>
                        <span className="text-xs text-gray-500">{note.timestamp}</span>
                      </div>
                      <p className="text-sm">{note.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a note to this conversation..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSendNote} disabled={!newNote.trim()}>
                      Send Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default OrderDetails
