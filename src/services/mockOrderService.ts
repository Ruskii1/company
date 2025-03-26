
import { Order } from '@/types/order'

export const getMockOrder = (taskId: string | undefined): Order => {
  const mockOrder: Order = {
    id: '1001',
    taskId: '2023-001',
    customerName: 'Acme Corporation',
    serviceType: 'Regular Towing',
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
      arrivedAt: '2023-06-15 09:00 AM',
      inServiceAt: '2023-06-15 09:05 AM',
      dropoffAt: '2023-06-15 10:00 AM'
    },
    provider: {
      name: 'John Doe',
      phone: '+966 55 123 4567',
      rating: 4.8,
      corporationName: 'Saudi Express Delivery',
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
        lat: 24.7136,
        lng: 46.6753 
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
  };
  
  // Find the order that matches the taskId
  if (taskId === '2023-002') {
    mockOrder.taskId = '2023-002';
    mockOrder.status = 'In route';
    mockOrder.serviceType = 'Battery Jumpstart';
    // Jeddah coordinates
    mockOrder.provider.location = {
      lat: 21.4858,
      lng: 39.1925
    };
  } else if (taskId === '2023-003') {
    mockOrder.taskId = '2023-003';
    mockOrder.status = 'Waiting for provider';
    mockOrder.serviceType = 'Fuel Delivery 95';
    // Mecca coordinates
    mockOrder.provider.location = {
      lat: 21.3891,
      lng: 39.8579
    };
  } else if (taskId === '2023-004' || taskId === '2023-005') {
    mockOrder.taskId = taskId;
    mockOrder.status = 'Completed';
    mockOrder.serviceType = 'Tire-Repair on Site';
    // Dammam coordinates
    mockOrder.provider.location = {
      lat: 26.4207,
      lng: 50.1033
    };
  } else if (taskId === '2023-006') {
    mockOrder.taskId = taskId;
    mockOrder.status = 'In service';
    mockOrder.serviceType = 'Lock Smith Service';
    // Medina coordinates
    mockOrder.provider.location = {
      lat: 24.5247,
      lng: 39.6142
    };
  } else if (taskId === '2023-007' || taskId === '2023-008') {
    mockOrder.taskId = taskId;
    mockOrder.status = 'Waiting for provider';
    mockOrder.serviceType = 'Half-Down Towing';
    // Tabuk coordinates
    mockOrder.provider.location = {
      lat: 28.3998,
      lng: 36.5841
    };
  }

  return mockOrder;
};
