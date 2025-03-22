
import { Order } from '@/types/orderManagement'

export const initialOrders: Order[] = [
  {
    id: '1001',
    taskId: '2025-001',
    customerName: 'Acme Corporation',
    serviceType: 'Package Delivery',
    pickupTime: '2025-06-15 09:00 AM',
    pickupLocation: '123 Business Ave, Tower A',
    dropoffLocation: '456 Commerce St, Suite 300',
    status: 'Completed'
  },
  {
    id: '1002',
    taskId: '2025-002',
    customerName: 'TechWave Solutions',
    serviceType: 'Document Courier',
    pickupTime: '2025-06-15 11:30 AM',
    pickupLocation: '789 Innovation Blvd',
    dropoffLocation: '321 Progress Way',
    status: 'In service'
  },
  {
    id: '1003',
    taskId: '2025-003',
    customerName: 'Global Finance Inc',
    serviceType: 'Express Delivery',
    pickupTime: '2025-06-16 08:45 AM',
    pickupLocation: '555 Financial Plaza',
    dropoffLocation: '777 Banking Avenue',
    status: 'Waiting for provider'
  },
  {
    id: '1004',
    taskId: '2025-004',
    customerName: 'Healthcare Partners',
    serviceType: 'Medical Supplies',
    pickupTime: '2025-06-16 14:15 PM',
    pickupLocation: 'Medical Center, Building C',
    dropoffLocation: 'City Hospital, North Wing',
    status: 'In route'
  },
  {
    id: '1005',
    taskId: '2025-005',
    customerName: 'Retail Distributors Ltd',
    serviceType: 'Retail Delivery',
    pickupTime: '2025-06-17 10:00 AM',
    pickupLocation: 'Distribution Center #3',
    dropoffLocation: 'Downtown Mall, Store 125',
    status: 'Arrived at the pick-up location'
  },
  {
    id: '1006',
    taskId: '2025-006',
    customerName: 'New Startup Inc',
    serviceType: 'Express Delivery',
    pickupTime: '2025-06-18 09:30 AM',
    pickupLocation: 'Tech Hub, Floor 3',
    dropoffLocation: 'Innovation Center, Room 201',
    status: 'Pending'
  },
  {
    id: '1007',
    taskId: '2025-007',
    customerName: 'Legal Partners LLP',
    serviceType: 'Document Courier',
    pickupTime: '2025-06-14 13:15 PM',
    pickupLocation: 'Legal Tower, 15th Floor',
    dropoffLocation: 'Courthouse, Records Department',
    status: 'Completed'
  },
  {
    id: '1008',
    taskId: '2025-008',
    customerName: 'Smart Electronics',
    serviceType: 'Electronics Delivery',
    pickupTime: '2025-06-15 15:45 PM',
    pickupLocation: 'Electronics Warehouse, Bay 12',
    dropoffLocation: 'Smart Home Exhibition, Booth 78',
    status: 'In route'
  },
  {
    id: '1009',
    taskId: '2025-009',
    customerName: 'Fresh Foods Inc',
    serviceType: 'Refrigerated Transport',
    pickupTime: '2025-06-16 06:00 AM',
    pickupLocation: 'Fresh Foods Distribution Center',
    dropoffLocation: 'Downtown Grocery Outlets',
    status: 'Pending'
  },
  {
    id: '1010',
    taskId: '2025-010',
    customerName: 'Education First',
    serviceType: 'School Supplies',
    pickupTime: '2025-06-17 08:30 AM',
    pickupLocation: 'Education Warehouse',
    dropoffLocation: 'Multiple School Districts',
    status: 'Pending'
  }
]
