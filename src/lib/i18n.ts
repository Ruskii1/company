import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en' | 'ar'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language })
    }),
    {
      name: 'language-storage'
    }
  )
)

// Update the translations to include the missing keys
export const translations = {
  en: {
    allRequests: "All Requests",
    pastRequests: "Past Requests",
    todaysRequests: "Today's Requests",
    futureRequests: "Future Requests",
    noPastRequests: "No past requests.",
    noTodayRequests: "No requests for today.",
    noFutureRequests: "No future requests.",
    employeePortal: "Employee Portal",
    navigation: "Navigation",
    orderManagement: "Order Management",
    tickets: "Tickets",
    createNewRequest: "Create New Request",
    corporateAccounts: "Corporate Accounts",
    serviceProviders: "Service Providers",
    serviceProvidersMap: "Service Providers Map",
    serviceProviderCompanies: "Service Provider Companies",
    requestNumber: "Request #",
    enterRequestNumber: "Enter request number",
  },
  ar: {
    allRequests: "جميع الطلبات",
    pastRequests: "الطلبات السابقة",
    todaysRequests: "طلبات اليوم",
    futureRequests: "الطلبات المستقبلية",
    noPastRequests: "لا توجد طلبات سابقة.",
    noTodayRequests: "لا توجد طلبات لهذا اليوم.",
    noFutureRequests: "لا توجد طلبات مستقبلية.",
    employeePortal: "بوابة الموظف",
    navigation: "الملاحة",
    orderManagement: "إدارة الطلبات",
    tickets: "تذاكر",
    createNewRequest: "إنشاء طلب جديد",
    corporateAccounts: "حسابات الشركات",
    serviceProviders: "مقدمو الخدمات",
    serviceProvidersMap: "خريطة مقدمي الخدمات",
    serviceProviderCompanies: "شركات مقدمي الخدمات",
    requestNumber: "رقم الطلب",
    enterRequestNumber: "أدخل رقم الطلب",
  },
}
