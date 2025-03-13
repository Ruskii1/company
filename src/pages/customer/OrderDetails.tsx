
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MapPin, Clock, Camera, Car, User, MessageCircle, FileText } from 'lucide-react'
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
  timeTracking: {
    acceptedAt: string
    inRouteAt: string
    arrivedAt: string
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
}

const CustomerOrderDetails = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('details')
  const [newNote, setNewNote] = useState('')
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
        timeTracking: {
          acceptedAt: '2023-06-15 08:45 AM',
          inRouteAt: '2023-06-15 08:50 AM',
          arrivedAt: '2023-06-15 09:00 AM',
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
        ]
      }
      
      // Find the order that matches the taskId
      if (taskId === '2023-002') {
        mockOrder.taskId = '2023-002'
        mockOrder.status = 'In route'
        mockOrder.serviceType = 'Package Pickup'
      } else if (taskId === '2023-003') {
        mockOrder.taskId = '2023-003'
        mockOrder.status = 'Waiting for provider'
        mockOrder.serviceType = 'Express Delivery'
      } else if (taskId === '2023-004' || taskId === '2023-005') {
        mockOrder.taskId = taskId
        mockOrder.status = 'Completed'
      } else if (taskId === '2023-006') {
        mockOrder.taskId = taskId
        mockOrder.status = 'In service'
      } else if (taskId === '2023-007' || taskId === '2023-008') {
        mockOrder.taskId = taskId
        mockOrder.status = 'Waiting for provider'
      }
      
      setOrder(mockOrder)
      setLoading(false)
    }, 500)
  }, [taskId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Waiting for provider':
        return <Badge className="bg-yellow-500 text-black">{status}</Badge>
      case 'In route':
        return <Badge className="bg-blue-500">{status}</Badge>
      case 'Arrived at the pick-up location':
        return <Badge className="bg-indigo-500">{status}</Badge>
      case 'In service':
        return <Badge className="bg-purple-500">{status}</Badge>
      case 'Completed':
        return <Badge className="bg-green-500">{status}</Badge>
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
      sender: 'customer',
      message: newNote.trim(),
      timestamp: new Date().toLocaleString(),
      senderName: 'You'
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
            <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t.customerPortal}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.customerPortal}
        </Button>
        <div>
          <CardTitle className="text-2xl">{t.taskId}: {order.taskId}</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {t.status}: {getStatusBadge(order.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
            <TabsTrigger value="car">Car Details</TabsTrigger>
            <TabsTrigger value="external-notes">External Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.serviceType}</h3>
                  <p>{order.serviceType}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.pickupTime}</h3>
                  <p>{order.pickupTime}</p>
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
                      <TableCell className="font-medium">Pick-up Time</TableCell>
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
                      <TableCell className="font-medium">Arrived at Pick-up</TableCell>
                      <TableCell>{order.timeTracking.arrivedAt}</TableCell>
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
                    <p className="text-sm font-semibold mb-1">Rating</p>
                    <p>{order.provider.rating} / 5.0</p>
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
                  Conversation
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
                        <span className="font-semibold text-sm">{note.senderName}</span>
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
                      Send Message
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

export default CustomerOrderDetails
