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
    serviceType: "Service Type",
    services: "Services",
    pickupDate: "Pickup Date",
    selectDate: "Select Date",
    pickupLocation: "Pickup Location",
    dropoffLocation: "Dropoff Location",
    notes: "Notes",
    optional: "Optional",
    placeOrder: "Place Order",
    id: "ID",
    companyName: "Company Name",
    employeeName: "Employee Name",
    pickupTime: "Pickup Time",
    status: "Status",
    actions: "Actions",
    noOrders: "No orders found.",
    customerId: "Customer ID",
    customerPortal: "Customer Portal",
    placeNewOrder: "Place New Order",
    yourOrders: "Your Orders",
    taskId: "Task ID",
    customerName: "Customer Name",
    viewDetails: "View Details",
    escalateStatus: "Escalate Status",
    viewCustomerDetails: "View Customer Details",
    viewOrderDetails: "View Order Details",
    backToOrderManagement: "Back to Order Management",
    orderDetails: "Order Details",
    customerDetails: "Customer Details"
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
    serviceType: "نوع الخدمة",
    services: "الخدمات",
    pickupDate: "تاريخ الاستلام",
    selectDate: "اختر التاريخ",
    pickupLocation: "موقع الاستلام",
    dropoffLocation: "موقع التسليم",
    notes: "ملاحظات",
    optional: "اختياري",
    placeOrder: "تقديم الطلب",
    id: "المعرف",
    companyName: "اسم الشركة",
    employeeName: "اسم الموظف",
    pickupTime: "وقت الاستلام",
    status: "الحالة",
    actions: "الإجراءات",
    noOrders: "لم يتم العثور على طلبات.",
    customerId: "معرف العميل",
    customerPortal: "بوابة العميل",
    placeNewOrder: "تقديم طلب جديد",
    yourOrders: "طلباتك",
    taskId: "رقم المهمة",
    customerName: "اسم العميل",
    viewDetails: "عرض التفاصيل",
    escalateStatus: "تصعيد الحالة",
    viewCustomerDetails: "عرض تفاصيل العميل",
    viewOrderDetails: "عرض تفاصيل الطلب",
    backToOrderManagement: "العودة إلى إدارة الطلبات",
    orderDetails: "تفاصيل الطلب",
    customerDetails: "تفاصيل العميل"
  },
}
