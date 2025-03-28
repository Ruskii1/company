
import { enUS, arDZ } from "date-fns/locale";
import { Language } from './types';

// Export locales for date-fns
export const locales = {
  en: enUS,
  ar: arDZ,
};

// Define RTL languages
export const rtlLanguages: Language[] = ["ar"];

// Define base translations for dashboard
export const baseTranslations = {
  dashboard: {
    previousRequests: 'Previous Requests',
    currentRequests: 'Current Requests',
    scheduledRequests: 'Scheduled Requests',
    companyBalance: 'Company Balance',
    recentActivities: 'Recent Activities',
    notifications: 'Notifications',
    requestsNeedAttention: 'Requests Need Attention',
    youHave: 'You have',
    requestsNeedingUpdate: 'requests that need your attention.',
    viewRequests: 'View Requests',
    upcomingRequests: 'Upcoming Requests',
    requestsInNextTwoHours: 'requests scheduled in the next 2 hours.',
    noRecentActivities: 'No recent activities',
    ticketStatus: 'Status',
    attention: 'Attention',
    soon: 'Soon',
    waitingForProvider: 'Waiting for provider',
    upcomingRequest: 'Upcoming soon',
  },
};

// Define Arabic translations
export const arabicTranslations = {
  dashboard: {
    previousRequests: 'الطلبات السابقة',
    currentRequests: 'الطلبات الحالية',
    scheduledRequests: 'الطلبات المجدولة',
    companyBalance: 'رصيد الشركة',
    recentActivities: 'الأنشطة الأخيرة',
    notifications: 'الإشعارات',
    requestsNeedAttention: 'طلبات تحتاج اهتمام',
    youHave: 'لديك',
    requestsNeedingUpdate: 'طلبات تحتاج إلى اهتمامك.',
    viewRequests: 'عرض الطلبات',
    upcomingRequests: 'الطلبات القادمة',
    requestsInNextTwoHours: 'طلبات مجدولة في الساعتين القادمتين.',
    noRecentActivities: 'لا توجد أنشطة حديثة',
    ticketStatus: 'الحالة',
    attention: 'انتباه',
    soon: 'قريباً',
    waitingForProvider: 'في انتظار المزود',
    upcomingRequest: 'قادم قريباً',
  },
};
