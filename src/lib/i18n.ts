
import { create } from 'zustand'

type Language = 'en' | 'ar'

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}))

export const translations = {
  en: {
    customerPortal: 'Customer Portal',
    placeNewOrder: 'Place a New Order',
    yourOrders: 'Your Orders',
    serviceType: 'Select Service Type',
    pickupLocation: 'Pick-Up Location',
    dropoffLocation: 'Drop-Off Location',
    notes: 'Notes (optional)',
    placeOrder: 'Place Order',
    id: 'ID',
    companyName: 'Company Name',
    employeeName: 'Employee Name',
    serviceType: 'Service Type',
    pickupTime: 'Pick-Up Time',
    pickupLocation: 'Pick-Up Location',
    dropoffLocation: 'Drop-Off Location',
    notes: 'Notes',
    status: 'Status',
    noOrders: 'No orders placed yet',
  },
  ar: {
    customerPortal: 'بوابة العملاء',
    placeNewOrder: 'تقديم طلب جديد',
    yourOrders: 'طلباتك',
    serviceType: 'اختر نوع الخدمة',
    pickupLocation: 'موقع الاستلام',
    dropoffLocation: 'موقع التسليم',
    notes: 'ملاحظات (اختياري)',
    placeOrder: 'تقديم الطلب',
    id: 'المعرف',
    companyName: 'اسم الشركة',
    employeeName: 'اسم الموظف',
    serviceType: 'نوع الخدمة',
    pickupTime: 'وقت الاستلام',
    pickupLocation: 'موقع الاستلام',
    dropoffLocation: 'موقع التسليم',
    notes: 'ملاحظات',
    status: 'الحالة',
    noOrders: 'لم يتم تقديم أي طلبات بعد',
  },
}

