
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
  orderManagement: string
  noOrders: string
  actions: string
  viewDetails: string
  customerName: string
  yourOrders: string
  manageYourAccountSettings: string
  allRequests: string
  credit: string
}

// Settings translations type
export interface SettingsTranslations {
  // Common settings
  preferences: string
  customizeYourUserExperience: string
  appearance: string
  chooseHowTheApplicationLooks: string
  light: string
  dark: string
  selectYourPreferredLanguage: string
  
  // Profile settings
  profileInformation: string
  updateYourProfileInformation: string
  fullName: string
  emailAddress: string
  phoneNumber: string
  companyName: string
  saving: string
  saveChanges: string
  yourProfileHasBeenSuccessfullyUpdated: string
  
  // Security settings
  securitySettings: string
  manageYourSecuritySettings: string
  changePassword: string
  updateYourPasswordToASecureOne: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  updating: string
  updatePassword: string
  passwordUpdated: string
  yourPasswordHasBeenSuccessfullyUpdated: string
  resetPassword: string
  requestAPasswordResetEmail: string
  resetPasswordDescription: string
  emailSent: string
  sendResetEmail: string
  resetPasswordEmailSent: string
  pleaseCheckYourEmailToResetYourPassword: string
  twoFactorAuthentication: string
  enhanceYourAccountSecurity: string
  enableTwoFactor: string
  twoFactorDescription: string
  twoFactorEnabled: string
  twoFactorDisabled: string
  twoFactorAuthenticationIsNowEnabled: string
  twoFactorAuthenticationIsNowDisabled: string
  
  // Payment settings
  manageYourPaymentMethodsForBillingAndPayments: string
  manageYourCreditCardsForPayments: string
  manageYourBankAccountsForPayments: string
  creditCards: string
  bankAccounts: string
  noCreditCardsAdded: string
  noBankAccountsAdded: string
  default: string
  expires: string
  setAsDefault: string
  addCreditCard: string
  addBankAccount: string
  creditCardAdded: string
  yourCreditCardHasBeenAddedSuccessfully: string
  bankAccountAdded: string
  yourBankAccountHasBeenAddedSuccessfully: string
  bankName: string
  accountHolderName: string
  expiryDate: string
  addANewPaymentMethodToYourAccount: string
  
  // Provider settings
  manageProviders: string
  configureServiceProvidersForYourAccount: string
  addProvider: string
  addNewProvider: string
  connectToANewServiceProvider: string
  providerSelectionInstructions: string
  connectProvider: string
  providerAdded: string
  newProviderHasBeenAddedToYourAccount: string
  connectedProviders: string
  servicesYouveAuthorizedToAccessYourAccount: string
  lastUsed: string
  active: string
  inactive: string
  providerActivated: string
  providerDeactivated: string
  hasBeenActivated: string
  hasBeenDeactivated: string
  providerRemoved: string
  hasBeenRemovedFromYourAccount: string
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
  noOrders: string
  customerName: string
  employeeName: string
  companyName: string
  notes: string
  optional: string
  actions: string
  viewDetails: string
  customerId: string
  pickupDate: string
  selectDate: string
  escalateStatus: string
  id: string
}

// Service type translations
export interface ServicesTranslations {
  serviceType: string
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
  customerPortal: string
  employeePortal: string
  home: string
  placeNewOrder: string
  allRequests: string
  tickets: string
  credit: string
  signOut: string
  settings: string
  preferences: string
  navigation: string
  theme: string
  language: string
  manageYourAccountSettings: string
}

// Profile translations
export interface ProfileTranslations {
  profile: string
  profileInformation: string
  updateYourProfileInformation: string
  fullName: string
  emailAddress: string
  phoneNumber: string
  companyName: string
  profileUpdated: string
  yourProfileHasBeenSuccessfullyUpdated: string
  saving: string
  saveChanges: string
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
}

// Security translations
export interface SecurityTranslations {
  security: string
  securitySettings: string
  manageYourSecuritySettings: string
  changePassword: string
  updateYourPasswordToASecureOne: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  updating: string
  updatePassword: string
  passwordUpdated: string
  yourPasswordHasBeenSuccessfullyUpdated: string
  resetPassword: string
  requestAPasswordResetEmail: string
  resetPasswordDescription: string
  emailSent: string
  sendResetEmail: string
  resetPasswordEmailSent: string
  pleaseCheckYourEmailToResetYourPassword: string
  twoFactorAuthentication: string
  enhanceYourAccountSecurity: string
  enableTwoFactor: string
  twoFactorDescription: string
  twoFactorEnabled: string
  twoFactorDisabled: string
  twoFactorAuthenticationIsNowEnabled: string
  twoFactorAuthenticationIsNowDisabled: string
  passwordsDoNotMatch: string
  passwordChanged: string
  sessionManagement: string
  activeSessions: string
  logoutAllDevices: string
  loggedOutAllDevices: string
  deviceName: string
  lastActive: string
  location: string
  ipAddress: string
  preferences: string
  customizeYourUserExperience: string
  appearance: string
  chooseHowTheApplicationLooks: string
  light: string
  dark: string
  selectYourPreferredLanguage: string
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
  manageYourPaymentMethodsForBillingAndPayments: string
  manageYourCreditCardsForPayments: string
  manageYourBankAccountsForPayments: string
  creditCards: string
  bankAccounts: string
  noCreditCardsAdded: string
  noBankAccountsAdded: string
  default: string
  expires: string
  setAsDefault: string
  addCreditCard: string
  addBankAccount: string
  creditCardAdded: string
  yourCreditCardHasBeenAddedSuccessfully: string
  bankAccountAdded: string
  yourBankAccountHasBeenAddedSuccessfully: string
  bankName: string
  accountHolderName: string
  expiryDate: string
  addANewPaymentMethodToYourAccount: string
}

// Provider translations
export interface ProviderTranslations {
  providers: string
  manageProviders: string
  configureServiceProvidersForYourAccount: string
  addProvider: string
  addNewProvider: string
  connectToANewServiceProvider: string
  providerSelectionInstructions: string
  connectProvider: string
  providerAdded: string
  newProviderHasBeenAddedToYourAccount: string
  connectedProviders: string
  servicesYouveAuthorizedToAccessYourAccount: string
  providerName: string
  status: string
  lastUsed: string
  actions: string
  active: string
  inactive: string
  providerActivated: string
  providerDeactivated: string
  hasBeenActivated: string
  hasBeenDeactivated: string
  providerRemoved: string
  hasBeenRemovedFromYourAccount: string
  serviceProviders: string
  serviceProvidersMap: string
  serviceProviderCompanies: string
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
export type Translations = CoreTranslations & OrderTranslations & ServicesTranslations & CommonTranslations & 
  ProfileTranslations & SecurityTranslations & PaymentTranslations & ProviderTranslations & SettingsTranslations
