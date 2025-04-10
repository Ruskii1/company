
import { useLanguageStore } from "@/lib/i18n";
import { format, parseISO } from "date-fns";
import { enUS, arDZ } from "date-fns/locale";

export const formatCurrency = (amount: number): string => {
  // Use the current language from global state when possible
  // For now, we'll use 'en-SA' for English and 'ar-SA' for Arabic
  const language = useLanguageStore.getState().language;
  
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date with consistent style
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    return dateString || 'N/A';
  }
};

// Format time with consistent style
export const formatTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'hh:mm a');
  } catch (error) {
    return dateString || 'N/A';
  }
};

// Format date and time together with consistent style
export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const language = useLanguageStore.getState().language;
    const locale = language === 'ar' ? arDZ : enUS;
    
    return format(date, 'PPp', { locale });
  } catch (error) {
    return dateString || 'N/A';
  }
};

// Format for displaying in a table with date on top line and time below
export const formatDateTimeTable = (dateString: string): JSX.Element => {
  try {
    const date = parseISO(dateString);
    return (
      <div className="flex flex-col">
        <span className="font-medium">{format(date, 'yyyy-MM-dd')}</span>
        <span className="text-sm text-muted-foreground">{format(date, 'HH:mm')}</span>
      </div>
    );
  } catch (error) {
    return <span>{dateString || 'N/A'}</span>;
  }
};

// Get human-readable time difference (e.g., "5 minutes ago", "2 hours ago")
export const getTimeAgo = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    return formatDate(dateString);
  } catch (error) {
    return dateString || 'N/A';
  }
};
