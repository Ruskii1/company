
import { ActionLogEntry } from '@/types/provider';

export const createActionLogEntry = (
  action: string,
  performedBy: {
    id: string;
    name: string;
    role: string;
  },
  details: string
): ActionLogEntry => {
  return {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action,
    performedBy,
    details
  };
};
