
import { useState, useEffect } from 'react';
import { Request } from '@/types/request';
import { toast } from 'sonner';
import { categorizeRequestsByDate } from '@/utils/dateUtils';

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
        
        // Mock requests data
        const mockRequests: Request[] = [
          {
            id: "req-001",
            taskId: "TASK-1001",
            companyName: "TechCorp LLC",
            employeeName: "Ahmed Al-Rashid",
            serviceType: "Regular Towing",
            pickupTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            pickupLocation: "123 Main St, Riyadh",
            dropoffLocation: "456 Market Ave, Riyadh",
            status: "Completed",
            notes: "Vehicle has flat tire",
            city: "Riyadh",
            providerId: "PRV-001",
            providerPhone: "+966-123-456-7890"
          },
          {
            id: "req-002",
            taskId: "TASK-1002",
            companyName: "GlobalTrade Inc.",
            employeeName: "Mohammed Al-Qahtani",
            serviceType: "Battery Jumpstart",
            pickupTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            pickupLocation: "789 Business Blvd, Jeddah",
            dropoffLocation: "321 Commerce St, Jeddah",
            status: "Completed",
            notes: "Battery drained due to lights left on",
            city: "Jeddah",
            providerId: "PRV-002",
            providerPhone: "+966-123-456-7891"
          },
          {
            id: "req-003",
            taskId: "TASK-1003",
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
            providerPhone: "+966-123-456-7892"
          },
          {
            id: "req-004",
            taskId: "TASK-1004",
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
            providerPhone: ""
          },
          {
            id: "req-005",
            taskId: "TASK-1005",
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
            providerPhone: ""
          },
          {
            id: "req-006",
            taskId: "TASK-1006",
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
            providerPhone: ""
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
