import { enUS, arDZ } from "date-fns/locale";
import { create } from 'zustand';

export type Language = "en" | "ar";

export interface Translation {
  home: string;
  orderManagement: string;
  totalRequests: string;
  openTickets: string;
  closedTickets: string;
  recentActivity: string;
  todaysRequests: string;
  viewAll: string;
  andMore: string;
  requests: string;
  noTodayRequests: string;
  attentionRequired: string;
  providerIssues: string;
  thereAre: string;
  requestsWithoutProvider: string;
  reviewRequests: string;
  pastTodayFutureRequests: string;
  ticketsNeedingAttention: string;
  resolvedTickets: string;
  noRecentActivity: string;
  dashboard: string;
  orders: string;
  requestsPage: string;
  corporateAccounts: string;
  serviceProviders: string;
  serviceProvidersMap: string;
  newRequest: string;
  tickets: string;
  settings: string;
  logout: string;
  customerPortal: string;
  employeePortal: string;
  language: string;
  english: string;
  arabic: string;
  theme: string;
  light: string;
  dark: string;
  system: string;
  profile: string;
  general: string;
  security: string;
  notifications: string;
  criticalAlerts: string;
  noProviderAccepted: string;
  noProviderFound: string;
  waitingForProvider: string;
  serviceProviderCompanies: string;
}

export interface TranslationCore {
  en: Translation;
  ar: Translation;
}

export const locales = {
  en: enUS,
  ar: arDZ,
};

export const rtlLanguages: Language[] = ["ar"];

export const translations: TranslationCore = {
  en: {
    home: "Home",
    orderManagement: "Order Management",
    totalRequests: "Total Requests",
    openTickets: "Open Tickets",
    closedTickets: "Closed Tickets",
    recentActivity: "Recent Activity",
    todaysRequests: "Today's Requests",
    viewAll: "View All",
    andMore: "and more",
    requests: "requests",
    noTodayRequests: "No requests for today",
    attentionRequired: "Attention Required",
    providerIssues: "Provider Issues",
    thereAre: "There are",
    requestsWithoutProvider: "requests without a provider assigned",
    reviewRequests: "Review Requests",
    pastTodayFutureRequests: "Past, Today, and Future Requests",
    ticketsNeedingAttention: "Tickets Needing Attention",
    resolvedTickets: "Resolved Tickets",
    noRecentActivity: "No recent activity",
    dashboard: "Dashboard",
    orders: "Orders",
    requestsPage: "Requests",
    corporateAccounts: "Corporate Accounts",
    serviceProviders: "Service Providers",
    serviceProvidersMap: "Service Providers Map",
    newRequest: "New Request",
    tickets: "Tickets",
    settings: "Settings",
    logout: "Logout",
    customerPortal: "Customer Portal",
    employeePortal: "Employee Portal",
    language: "Language",
    english: "English",
    arabic: "Arabic",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    profile: "Profile",
    general: "General",
    security: "Security",
    notifications: "Notifications",
    criticalAlerts: "Critical Alerts",
    noProviderAccepted: "No Provider Accepted",
    noProviderFound: "No Provider Found",
    waitingForProvider: "Waiting for provider",
    serviceProviderCompanies: "Service Provider Companies",
  },
  ar: {
    home: "الرئيسية",
    orderManagement: "إدارة الطلبات",
    totalRequests: "إجمالي الطلبات",
    openTickets: "التذاكر المفتوحة",
    closedTickets: "التذاكر المغلقة",
    recentActivity: "النشاط الأخير",
    todaysRequests: "طلبات اليوم",
    viewAll: "عرض الكل",
    andMore: "والمزيد",
    requests: "طلبات",
    noTodayRequests: "لا توجد طلبات لليوم",
    attentionRequired: "مطلوب الاهتمام",
    providerIssues: "مشاكل المورد",
    thereAre: "يوجد",
    requestsWithoutProvider: "طلبات بدون تعيين مورد",
    reviewRequests: "مراجعة الطلبات",
    pastTodayFutureRequests: "الطلبات السابقة واليوم والمستقبلية",
    ticketsNeedingAttention: "تذاكر تحتاج إلى اهتمام",
    resolvedTickets: "تذاكر تم حلها",
    noRecentActivity: "لا يوجد نشاط حديث",
    dashboard: "لوحة القيادة",
    orders: "الطلبات",
    requestsPage: "الطلبات",
    corporateAccounts: "حسابات الشركات",
    serviceProviders: "مقدمو الخدمات",
    serviceProvidersMap: "خريطة مقدمي الخدمات",
    newRequest: "طلب جديد",
    tickets: "تذاكر",
    settings: "إعدادات",
    logout: "تسجيل الخروج",
    customerPortal: "بوابة العميل",
    employeePortal: "بوابة الموظف",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    theme: "المظهر",
    light: "فاتح",
    dark: "داكن",
    system: "النظام",
    profile: "الملف الشخصي",
    general: "عام",
    security: "الأمان",
    notifications: "إشعارات",
    criticalAlerts: "تنبيهات حرجة",
    noProviderAccepted: "لم يقبل أي مزود",
    noProviderFound: "لم يتم العثور على مزود",
    waitingForProvider: "في انتظار المورد",
    serviceProviderCompanies: "شركات مقدمي الخدمات",
  },
};

export const useLanguageStore = create<{
  language: Language;
  setLanguage: (language: Language) => void;
}>((set) => ({
  language: "en",
  setLanguage: (language) => set(() => ({ language })),
}));

export type Translations = {
  dashboard: {
    previousRequests: string;
    currentRequests: string;
    scheduledRequests: string;
    companyBalance: string;
    recentActivities: string;
    notifications: string;
    requestsNeedAttention: string;
    youHave: string;
    requestsNeedingUpdate: string;
    viewRequests: string;
    upcomingRequests: string;
    requestsInNextTwoHours: string;
    noRecentActivities: string;
    ticketStatus: string;
    attention: string;
    soon: string;
    waitingForProvider: string;
    upcomingRequest: string;
  };
};

export const baseTranslations: Translations = {
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

export const arabicTranslations: Partial<Translations> = {
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
