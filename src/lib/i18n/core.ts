import { en as enUS, ar as arDZ, Locale } from "date-fns/locale";

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
}

export interface TranslationCore {
  en: Translation;
  ar: Translation;
}

export const locales: Record<Language, Locale> = {
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
  },
};
