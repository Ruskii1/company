
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
    serviceType: 'Service Type',
    pickupLocation: 'Pick-Up Location',
    dropoffLocation: 'Drop-Off Location',
    notes: 'Notes',
    placeOrder: 'Place Order',
    id: 'ID',
    companyName: 'Company Name',
    employeeName: 'Employee Name',
    pickupTime: 'Pick-Up Time',
    status: 'Status',
    noOrders: 'No orders placed yet',
    pickupDate: 'Pick-Up Date & Time',
    selectDate: 'Select a date',
    optional: '(optional)',
  },
  ar: {
    customerPortal: 'بوابة العملاء',
    placeNewOrder: 'تقديم طلب جديد',
    yourOrders: 'طلباتك',
    serviceType: 'نوع الخدمة',
    pickupLocation: 'موقع الاستلام',
    dropoffLocation: 'موقع التسليم',
    notes: 'ملاحظات',
    placeOrder: 'تقديم الطلب',
    id: 'المعرف',
    companyName: 'اسم الشركة',
    employeeName: 'اسم الموظف',
    pickupTime: 'وقت الاستلام',
    status: 'الحالة',
    noOrders: 'لم يتم تقديم أي طلبات بعد',
    pickupDate: 'التاريخ والوقت',
    selectDate: 'اختر تاريخ',
    optional: '(اختياري)',
  },
}
