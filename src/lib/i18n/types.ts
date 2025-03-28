
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
  pastRequests?: string;
  todaysRequests?: string;
  futureRequests?: string;
}

// Settings translations
export interface SecuritySettingsTranslation {
  securitySettings: string;
  manageYourSecuritySettings: string;
  changePassword: string;
  updateYourPasswordToASecureOne: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  updating: string;
  updatePassword: string;
  passwordUpdated: string;
  yourPasswordHasBeenSuccessfullyUpdated: string;
  resetPassword: string;
  requestAPasswordResetEmail: string;
  resetPasswordDescription: string;
  emailSent: string;
  sendResetEmail: string;
  resetPasswordEmailSent: string;
  pleaseCheckYourEmailToResetYourPassword: string;
  twoFactorAuthentication: string;
  enhanceYourAccountSecurity: string;
  enableTwoFactor: string;
  twoFactorDescription: string;
  twoFactorEnabled: string;
  twoFactorDisabled: string;
  twoFactorAuthenticationIsNowEnabled: string;
  twoFactorAuthenticationIsNowDisabled: string;
}

export interface ProfileSettingsTranslation {
  profileInformation: string;
  updateYourProfileInformation: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  saving: string;
  saveChanges: string;
  profileUpdated: string;
  yourProfileHasBeenSuccessfullyUpdated: string;
  appearance: string;
  chooseHowTheApplicationLooks: string;
  light: string;
  dark: string;
  selectYourPreferredLanguage: string;
  customizeYourUserExperience: string;
}

export interface ProviderSettingsTranslation {
  manageProviders: string;
  configureServiceProvidersForYourAccount: string;
  addProvider: string;
  addNewProvider: string;
  connectToANewServiceProvider: string;
  providerSelectionInstructions: string;
  providerAdded: string;
  newProviderHasBeenAddedToYourAccount: string;
  connectProvider: string;
  connectedProviders: string;
  servicesYouveAuthorizedToAccessYourAccount: string;
  providerName: string;
  lastUsed: string;
  active: string;
  inactive: string;
  providerDeactivated: string;
  providerActivated: string;
  hasBeenDeactivated: string;
  hasBeenActivated: string;
  providerRemoved: string;
  hasBeenRemovedFromYourAccount: string;
}

export interface PaymentSettingsTranslation {
  paymentMethods: string;
  manageYourPaymentMethodsForBillingAndPayments: string;
  manageYourCreditCardsForPayments: string;
  manageYourBankAccountsForPayments: string;
  creditCards: string;
  bankAccounts: string;
  noCreditCardsAdded: string;
  noBankAccountsAdded: string;
  default: string;
  expires: string;
  setAsDefault: string;
  addPaymentMethod: string;
  addANewPaymentMethodToYourAccount: string;
  creditCard: string;
  bankAccount: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  addCreditCard: string;
  creditCardAdded: string;
  yourCreditCardHasBeenAddedSuccessfully: string;
  bankName: string;
  accountHolderName: string;
  routingNumber: string;
  accountNumber: string;
  addBankAccount: string;
  bankAccountAdded: string;
  yourBankAccountHasBeenAddedSuccessfully: string;
}

export interface CustomerSettingsTranslation {
  manageYourAccountSettings: string;
  securitySettings: SecuritySettingsTranslation;
  profile: ProfileSettingsTranslation;
  providers: ProviderSettingsTranslation;
  payment: PaymentSettingsTranslation;
  preferences?: string;
}

// Define customer translation interface
export interface CustomerTranslation {
  dashboard: DashboardTranslation;
  settings: CustomerSettingsTranslation;
  creditCard: string;
  bankAccount: string;
  navigation?: string;
  signOut?: string;
  placeNewOrder?: string;
  allRequests?: string;
  credit?: string;
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
  dashboard: DashboardTranslation;
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
}

// Define overall translation structure
export interface TranslationCore {
  en: Translation & { customer: CustomerTranslation };
  ar: Translation & { customer: CustomerTranslation };
}
