
// Define language type
export type Language = 'en' | 'ar';

// Define translation interfaces for dashboard
export interface DashboardTranslation {
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
}

// Define base translation interface
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
  // Moved dashboard object to its own property in translations
  dashboardTranslation: DashboardTranslation;
}

// Define overall translation structure
export interface TranslationCore {
  en: Translation;
  ar: Translation;
}
