
import { useState, useEffect } from 'react';
import { Request } from '@/types/request';
import { toast } from 'sonner';
import { categorizeRequestsByDate } from '@/utils/dateUtils';
import { OrderStatus } from '@/types/orderStatus';

export const useRequestsData = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [pastRequests, setPastRequests] = useState<Request[]>([]);
  const [todayRequests, setTodayRequests] = useState<Request[]>([]);
  const [futureRequests, setFutureRequests] = useState<Request[]>([]);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        
        // Mock requests data with standardized task IDs
        const mockRequests: Request[] = [
          {
            id: "req-001",
            taskId: "2025-001",
            companyName: "TechCorp LLC",
            employeeName: "Ahmed Al-Rashid",
            serviceType: "Regular Towing",
            pickupTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            pickupLocation: "123 Main St, Riyadh",
            dropoffLocation: "456 Market Ave, Riyadh",
            status: "Complete", // Fixed: Changed from "Completed" to "Complete"
            notes: "Vehicle has flat tire",
            city: "Riyadh",
            providerId: "PRV-001",
            providerPhone: "+966-123-456-7890",
            // Add required properties
            provider: {
              name: "Abdullah Al-Qahtani",
              phone: "+966-123-456-7890",
              rating: 4.8,
              corporationName: "TechTow Services",
              images: { pickup: [], dropoff: [] },
              location: { lat: 24.7136, lng: 46.6753 }
            },
            timeTracking: {
              acceptedAt: new Date(Date.now() - 2.2 * 24 * 60 * 60 * 1000).toISOString(),
              inRouteAt: new Date(Date.now() - 2.15 * 24 * 60 * 60 * 1000).toISOString(),
              arrivedAt: new Date(Date.now() - 2.1 * 24 * 60 * 60 * 1000).toISOString(),
              inServiceAt: new Date(Date.now() - 2.05 * 24 * 60 * 60 * 1000).toISOString(),
              dropoffAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            conversation: []
          },
          {
            id: "req-002",
            taskId: "2025-002",
            companyName: "GlobalTrade Inc.",
            employeeName: "Mohammed Al-Qahtani",
            serviceType: "Battery Jumpstart",
            pickupTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            pickupLocation: "789 Business Blvd, Jeddah",
            dropoffLocation: "321 Commerce St, Jeddah",
            status: "Complete", // Fixed: Changed from "Completed" to "Complete"
            notes: "Battery drained due to lights left on",
            city: "Jeddah",
            providerId: "PRV-002",
            providerPhone: "+966-123-456-7891",
            // Add required properties
            provider: {
              name: "Khalid Al-Harbi",
              phone: "+966-123-456-7891",
              rating: 4.9,
              corporationName: "JumpStart Co.",
              images: { pickup: [], dropoff: [] },
              location: { lat: 21.5433, lng: 39.1728 }
            },
            timeTracking: {
              acceptedAt: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000).toISOString(),
              inRouteAt: new Date(Date.now() - 1.15 * 24 * 60 * 60 * 1000).toISOString(),
              arrivedAt: new Date(Date.now() - 1.1 * 24 * 60 * 60 * 1000).toISOString(),
              inServiceAt: new Date(Date.now() - 1.05 * 24 * 60 * 60 * 1000).toISOString(),
              dropoffAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            conversation: []
          },
          {
            id: "req-003",
            taskId: "2025-003",
            companyName: "SmartSolutions SA",
            employeeName: "Khalid Al-Harbi",
            serviceType: "Tire Change",
            pickupTime: new Date().toISOString(), // Today
            pickupLocation: "555 Park Dr, Dammam",
            dropoffLocation: "777 Garden Rd, Dammam",
            status: "In Route",
            notes: "Spare tire in trunk",
            city: "Dammam",
            providerId: "PRV-003",
            providerPhone: "+966-123-456-7892",
            // Add required properties
            provider: {
              name: "Mohammed Al-Otaibi",
              phone: "+966-123-456-7892",
              rating: 4.7,
              corporationName: "Tire Pro Services",
              images: { pickup: [], dropoff: [] },
              location: { lat: 26.4207, lng: 50.0888 }
            },
            timeTracking: {
              acceptedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
              inRouteAt: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(),
              arrivedAt: "",
              inServiceAt: "",
              dropoffAt: ""
            },
            conversation: []
          },
          {
            id: "req-004",
            taskId: "2025-004",
            companyName: "InnovateX Ltd",
            employeeName: "Samir Al-Otaibi",
            serviceType: "Fuel Delivery",
            pickupTime: new Date().toISOString(), // Today
            pickupLocation: "222 Tech Plaza, Riyadh",
            dropoffLocation: "Same",
            status: "Waiting for Provider",
            notes: "Need 95 octane, 20 liters",
            city: "Riyadh",
            providerId: "",
            providerPhone: "",
            // Add required properties
            provider: {
              name: "",
              phone: "",
              rating: 0,
              corporationName: "",
              images: { pickup: [], dropoff: [] },
              location: { lat: 0, lng: 0 }
            },
            timeTracking: {
              acceptedAt: "",
              inRouteAt: "",
              arrivedAt: "",
              inServiceAt: "",
              dropoffAt: ""
            },
            conversation: []
          },
          {
            id: "req-005",
            taskId: "2025-005",
            companyName: "QualityServices LLC",
            employeeName: "Faisal Al-Ghamdi",
            serviceType: "Key Lockout",
            pickupTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
            pickupLocation: "101 Office Tower, Jeddah",
            dropoffLocation: "Same",
            status: "Scheduled",
            notes: "Keys locked in Toyota Camry",
            city: "Jeddah",
            providerId: "",
            providerPhone: "",
            // Add required properties
            provider: {
              name: "",
              phone: "",
              rating: 0,
              corporationName: "",
              images: { pickup: [], dropoff: [] },
              location: { lat: 0, lng: 0 }
            },
            timeTracking: {
              acceptedAt: "",
              inRouteAt: "",
              arrivedAt: "",
              inServiceAt: "",
              dropoffAt: ""
            },
            conversation: []
          },
          {
            id: "req-006",
            taskId: "2025-006",
            companyName: "Desert Enterprises",
            employeeName: "Omar Al-Shamrani",
            serviceType: "Flatbed Towing",
            pickupTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
            pickupLocation: "444 Industrial Zone, Dammam",
            dropoffLocation: "888 Repair Center, Dammam",
            status: "Scheduled",
            notes: "Non-running vehicle, transmission issue",
            city: "Dammam",
            providerId: "",
            providerPhone: "",
            // Add required properties
            provider: {
              name: "",
              phone: "",
              rating: 0,
              corporationName: "",
              images: { pickup: [], dropoff: [] },
              location: { lat: 0, lng: 0 }
            },
            timeTracking: {
              acceptedAt: "",
              inRouteAt: "",
              arrivedAt: "",
              inServiceAt: "",
              dropoffAt: ""
            },
            conversation: []
          }
        ];
        
        setRequests(mockRequests);
        
        // Categorize requests by date
        const categorized = categorizeRequestsByDate(mockRequests);
        setPastRequests(categorized.past);
        setTodayRequests(categorized.today);
        setFutureRequests(categorized.future);
      } catch (error) {
        console.error('Error loading requests:', error);
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  return {
    requests,
    loading,
    pastRequests,
    todayRequests,
    futureRequests
  };
};
