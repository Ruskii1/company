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
    employeePortal: 'Employee Portal',
    orderManagement: 'Order Management',
    taskId: 'Task ID',
    customerName: 'Customer Name',
    actions: 'Actions',
    viewDetails: 'View Details',
    time: 'Time',
    customerNotes: 'Customer Notes',
    employeeNotes: 'Employee Notes',
    addNote: 'Add Note',
    saveNote: 'Save Note',
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
    employeePortal: 'بوابة الموظفين',
    orderManagement: 'إدارة الطلبات',
    taskId: 'رقم المهمة',
    customerName: 'اسم العميل',
    actions: 'الإجراءات',
    viewDetails: 'عرض التفاصيل',
    time: 'الوقت',
    customerNotes: 'ملاحظات العميل',
    employeeNotes: 'ملاحظات الموظف',
    addNote: 'إضافة ملاحظة',
    saveNote: 'حفظ الملاحظة',
  },
}
