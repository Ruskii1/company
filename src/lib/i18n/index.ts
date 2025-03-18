
import { create } from 'zustand'
import { coreTranslations } from './core'
import { orderTranslations } from './order'
import { servicesTranslations } from './services'
import { profileTranslations } from './profile'
import { securityTranslations } from './security'
import { paymentTranslations } from './payment'
import { providerTranslations } from './providers'
import { commonTranslations } from './common'

// Languages that the application supports
export type SupportedLanguage = 'en' | 'ar'

// Core translations type
export interface CoreTranslations {
  customerPortal: string
  employeePortal: string
  placeOrder: string
  availableInLaterVersion: string
  notFound: string
  notFoundDescription: string
  goBackHome: string
  serviceType: string
  serviceProvider: string
  settings: string
  language: string
  theme: string
  signOut: string
  // Dashboard translations
  scheduledOrders: string
  ongoingOrders: string
  completedOrders: string
  ordersWaitingForService: string
  ordersInProgress: string
  ordersCompleted: string
  ticketsSummary: string
  openAndClosedTickets: string
  openTickets: string
  closedTickets: string
  manageTickets: string
  notifications: string
  recentSystemNotifications: string
  recentActions: string
  mostRecentActionsBy: string
  viewAll: string
}

// Order translations type
export interface OrderTranslations {
  createNewOrder: string
  placeNewOrder: string
  orderDetails: string
  orderHistory: string
  allOrders: string
  todaysOrders: string
  upcomingOrders: string
  orderManagement: string
  orders: string
  orderID: string
  taskId: string
  requestNumber: string
  createNewRequest: string
  ticketID: string
  tickets: string
  corporateAccounts: string
  serviceProviders: string
  serviceProviderCompanies: string
  serviceProvidersMap: string
  navigation: string
  pastRequests: string
  todaysRequests: string
  futureRequests: string
  noPastRequests: string
  noTodayRequests: string
  noFutureRequests: string
  viewOrderDetails: string
  location: string
  pickupLocation: string
  dropoffLocation: string
  pickupTime: string
  dropoffTime: string
  status: string
  statusPending: string
  statusInRoute: string
  statusCompleted: string
  statusArrived: string
  statusInService: string
  statusWaitingForProvider: string
  enterRequestNumber: string
  home: string
}

// Service type translations
export interface ServicesTranslations {
  services: Record<string, string>
  packageDelivery: string
  foodDelivery: string
  expressDelivery: string
  documentDelivery: string
  medicalDelivery: string
  furnatureDelivery: string
  fragileCargo: string
  all: string
}

// Common translations
export interface CommonTranslations {
  next: string
  back: string
  submit: string
  cancel: string
  search: string
  filter: string
  edit: string
  delete: string
  view: string
  save: string
  reset: string
  close: string
  continue: string
  apply: string
  add: string
  remove: string
  ok: string
  yes: string
  no: string
  done: string
  finish: string
  loading: string
  notes: string
}

// Profile translations
export interface ProfileTranslations {
  profile: string
  updateProfile: string
  personalInformation: string
  contactInformation: string
  address: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  profileUpdated: string
}

// Security translations
export interface SecurityTranslations {
  security: string
  changePassword: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  passwordsDoNotMatch: string
  passwordChanged: string
  twoFactorAuthentication: string
  enableTwoFactorAuthentication: string
  disableTwoFactorAuthentication: string
  twoFactorAuthenticationEnabled: string
  twoFactorAuthenticationDisabled: string
  sessionManagement: string
  activeSessions: string
  logoutAllDevices: string
  loggedOutAllDevices: string
  deviceName: string
  lastActive: string
  location: string
  ipAddress: string
}

// Payment translations
export interface PaymentTranslations {
  payment: string
  paymentMethods: string
  addPaymentMethod: string
  removePaymentMethod: string
  creditCard: string
  bankAccount: string
  paypal: string
  cardNumber: string
  cardholderName: string
  expirationDate: string
  cvv: string
  accountNumber: string
  routingNumber: string
  accountType: string
  accountName: string
  paymentMethodAdded: string
  paymentMethodRemoved: string
  billingAddress: string
  billingHistory: string
  invoices: string
  invoice: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  amount: string
  status: string
  paid: string
  unpaid: string
  overdue: string
  downloadInvoice: string
  payInvoice: string
  paymentConfirmation: string
  paymentSuccessful: string
  paymentFailed: string
  balance: string
  totalDue: string
  accountBalance: string
  addFunds: string
  withdrawFunds: string
  availableCredits: string
  paymentDetails: string
  paymentDate: string
  paymentMethod: string
  paymentStatus: string
  transactionHistory: string
}

// Provider translations
export interface ProviderTranslations {
  providerName: string
  providerLocation: string
  providerPhone: string
  providerEmail: string
  providerRating: string
  providerDetails: string
  providerStatus: string
  providerActive: string
  providerInactive: string
  providerSuspended: string
  providerType: string
  individual: string
  company: string
  vehicleInfo: string
  vehicleModel: string
  vehicleMake: string
  vehicleYear: string
  vehiclePlate: string
  vehicleColor: string
  providerDocuments: string
  driverLicense: string
  insurance: string
  registration: string
  backgroundCheck: string
  providerHistory: string
  completedOrders: string
  cancelledOrders: string
  acceptanceRate: string
  responseTime: string
  providerPayments: string
  totalEarnings: string
  pendingPayments: string
  lastPayment: string
  paymentSchedule: string
}

// Combined translations type
export type Translations = CoreTranslations & OrderTranslations & ServicesTranslations & CommonTranslations & ProfileTranslations & SecurityTranslations & PaymentTranslations & ProviderTranslations

// Use one object to store all translations by language
export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    ...coreTranslations.en,
    ...orderTranslations.en,
    ...servicesTranslations.en,
    ...commonTranslations.en,
    ...profileTranslations.en,
    ...securityTranslations.en,
    ...paymentTranslations.en,
    ...providerTranslations.en,
  },
  ar: {
    ...coreTranslations.ar,
    ...orderTranslations.ar,
    ...servicesTranslations.ar,
    ...commonTranslations.ar,
    ...profileTranslations.ar,
    ...securityTranslations.ar,
    ...paymentTranslations.ar,
    ...providerTranslations.ar,
  }
}

// Store to manage the language state
interface LanguageState {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}))
