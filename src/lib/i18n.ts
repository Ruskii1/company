
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
    services: {
      'standard-tow': 'Standard Tow Truck',
      'half-down-tow': 'Half-Down Tow Truck',
      'full-down-tow': 'Full-Down Tow Truck',
      'enclosed-tow': 'Enclosed Tow Truck',
      '4x4-tow': '4x4 Tow Truck',
      '8-wheel-tow': '8-Wheel Tow Truck',
      'intercity-standard-tow': 'Standard Tow Truck (Intercity)',
      'intercity-half-down-tow': 'Half-Down Tow Truck (Intercity)',
      'intercity-full-down-tow': 'Full-Down Tow Truck (Intercity)',
      'intercity-enclosed-tow': 'Enclosed Tow Truck (Intercity)',
      'intercity-4x4-tow': '4x4 Tow Truck (Intercity)',
      'intercity-8-wheel-tow': '8-Wheel Tow Truck (Intercity)',
      'mvpi-check': 'Periodic Vehicle Inspection (MVPI)',
      'battery-subscription': 'Battery Subscription Service',
      'battery-change': 'Battery Replacement',
      'tire-inflation': 'Tire Inflation with Air',
      'spare-tire-change': 'Spare Tire Replacement',
      'new-tire-purchase': 'Purchase and Replacement of a New Tire'
    }
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
    services: {
      'standard-tow': 'سطحة عادية',
      'half-down-tow': 'سطحة هاف داون',
      'full-down-tow': 'سطحة فل داون',
      'enclosed-tow': 'سطحة مغلقة',
      '4x4-tow': 'سطحة رياضية',
      '8-wheel-tow': 'سطحة بحرية',
      'intercity-standard-tow': 'سطحة عادية - بين المدن',
      'intercity-half-down-tow': 'سطحة هاف داون - بين المدن',
      'intercity-full-down-tow': 'سطحة فل داون - بين المدن',
      'intercity-enclosed-tow': 'سطحة مغلقة - بين المدن',
      'intercity-4x4-tow': 'سطحة رياضية - بين المدن',
      'intercity-8-wheel-tow': 'سطحة بحرية - بين المدن',
      'mvpi-check': 'الفحص الدوري - MVPI',
      'battery-subscription': 'اشتراك بطارية',
      'battery-change': 'تغيير البطارية',
      'tire-inflation': 'تعبئة الإطار بالهواء',
      'spare-tire-change': 'تغيير الإطار الاحتياطي',
      'new-tire-purchase': 'شراء إطار جديد وتغييره'
    }
  },
}
