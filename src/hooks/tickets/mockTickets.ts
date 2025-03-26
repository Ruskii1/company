
import { Ticket } from '@/types/ticket';

// Mock user for demonstration
export const currentUser = 'John Doe';

// Mock initial tickets
export const initialTickets: Ticket[] = [
  {
    id: 'ticket#0001',
    title: 'System Login Issue',
    description: 'Users are experiencing intermittent login failures on the provider portal.',
    status: 'open',
    tags: ['#IT', '#Urgent'],
    notes: [
      {
        id: '101',
        content: 'Investigating the authentication service.',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        createdBy: 'Jane Smith'
      }
    ],
    tagChanges: [
      {
        id: '201',
        tag: '#IT',
        addedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        addedBy: 'Jane Smith'
      },
      {
        id: '202',
        tag: '#Urgent',
        addedAt: new Date(Date.now() - 86400000), // 1 day ago
        addedBy: 'Jane Smith'
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    createdBy: 'Mike Johnson'
  },
  {
    id: 'ticket#0002',
    title: 'Payment Processing Delay',
    description: 'Customers reporting delays in payment processing for corporate accounts.',
    status: 'open',
    tags: ['#Finance', '#Corporates'],
    notes: [],
    tagChanges: [
      {
        id: '203',
        tag: '#Finance',
        addedAt: new Date(Date.now() - 86400000 * 1.5), // 1.5 days ago
        addedBy: 'Alex Wang'
      },
      {
        id: '204',
        tag: '#Corporates',
        addedAt: new Date(Date.now() - 86400000 * 1.5), // 1.5 days ago
        addedBy: 'Alex Wang'
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    createdBy: 'Alex Wang'
  },
  {
    id: 'ticket#0003',
    title: 'Driver Scheduling Conflict',
    description: 'Multiple drivers assigned to the same pickup slot.',
    status: 'closed',
    tags: ['#Operations', '#Scedule'],
    notes: [
      {
        id: '102',
        content: 'Identified the issue in the scheduling algorithm.',
        createdAt: new Date(Date.now() - 86400000 * 0.7), // 0.7 days ago
        createdBy: 'Sarah Johnson'
      },
      {
        id: '103',
        content: 'Fixed the conflict and updated the schedule.',
        createdAt: new Date(Date.now() - 86400000 * 0.3), // 0.3 days ago
        createdBy: 'Dev Team'
      }
    ],
    tagChanges: [
      {
        id: '205',
        tag: '#Operations',
        addedAt: new Date(Date.now() - 86400000), // 1 day ago
        addedBy: 'Sarah Johnson'
      },
      {
        id: '206',
        tag: '#Scedule',
        addedAt: new Date(Date.now() - 86400000), // 1 day ago
        addedBy: 'Sarah Johnson'
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 1.5), // 1.5 days ago
    createdBy: 'Chris Lee',
    closedAt: new Date(Date.now() - 86400000 * 0.2), // 0.2 days ago
    closedBy: 'Sarah Johnson'
  }
];
