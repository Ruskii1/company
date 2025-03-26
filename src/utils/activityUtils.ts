
import { CustomerTicket } from "@/types/customerTicket";

// Standardized request type matching the RecentActivities mock data structure
export interface CustomerRequest {
  id: string;
  taskId: string; // Format: 2025-XXX
  serviceType: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
}

// Combined activity type
export type CustomerActivity = 
  | { type: 'request'; data: CustomerRequest }
  | { type: 'ticket'; data: CustomerTicket };

// Sort activities by date (most recent first)
export function sortActivitiesByDate(activities: CustomerActivity[]): CustomerActivity[] {
  return [...activities].sort((a, b) => {
    const dateA = new Date(a.type === 'request' ? a.data.pickupTime : a.data.createdAt);
    const dateB = new Date(b.type === 'request' ? b.data.pickupTime : b.data.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
}

// Mock request data with standardized task IDs (2025-XXX format)
export const getMockRequests = (): CustomerRequest[] => [
  {
    id: "req-001",
    taskId: "2025-001",
    serviceType: "Regular Towing",
    pickupTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    pickupLocation: "123 Main St, Riyadh",
    dropoffLocation: "456 Market Ave, Riyadh",
    status: "Completed"
  },
  {
    id: "req-002",
    taskId: "2025-002",
    serviceType: "Battery Jumpstart",
    pickupTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    pickupLocation: "789 Business Blvd, Jeddah",
    dropoffLocation: "321 Commerce St, Jeddah",
    status: "Completed"
  },
  {
    id: "req-003",
    taskId: "2025-003",
    serviceType: "Tire Change",
    pickupTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // In 1 hour
    pickupLocation: "555 Park Dr, Dammam",
    dropoffLocation: "777 Garden Rd, Dammam",
    status: "Scheduled"
  }
];

// Get mock ticket data with standardized ticket IDs (ticket#XXXX format)
export const getMockTickets = (): CustomerTicket[] => [
  {
    id: 'ticket#1001',
    title: 'Driver was late',
    description: 'The driver was 30 minutes late to the pickup location',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    status: 'open',
    replies: []
  },
  {
    id: 'ticket#1002',
    title: 'Question about billing',
    description: 'I have a question about the charges on my last invoice',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    status: 'closed',
    replies: []
  }
];

// Get combined and sorted activities
export function getRecentActivities(limit: number = 5): CustomerActivity[] {
  const activities: CustomerActivity[] = [
    ...getMockRequests().map(request => ({ type: 'request' as const, data: request })),
    ...getMockTickets().map(ticket => ({ type: 'ticket' as const, data: ticket }))
  ];
  
  return sortActivitiesByDate(activities).slice(0, limit);
}
