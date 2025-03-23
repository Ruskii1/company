
import { Request } from '@/types/request';
import { startOfDay, endOfDay, isAfter, isBefore, isToday, parseISO } from 'date-fns';

export const categorizeRequestsByDate = (requests: Request[]) => {
  const today = new Date();
  const startOfToday = startOfDay(today);
  const endOfToday = endOfDay(today);

  const past: Request[] = [];
  const present: Request[] = [];
  const future: Request[] = [];

  requests.forEach(request => {
    const pickupDate = parseISO(request.pickupTime);
    
    if (isBefore(pickupDate, startOfToday)) {
      past.push(request);
    } else if (isToday(pickupDate)) {
      present.push(request);
    } else if (isAfter(pickupDate, endOfToday)) {
      future.push(request);
    }
  });

  return {
    past,
    today: present,
    future
  };
};
