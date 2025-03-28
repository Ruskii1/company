
// Define who can edit each field
export type EditorRole = 'System' | 'Admin/Authorized Employee' | 'Admin Only';

// Define invoice field permission structure
export interface FieldPermission {
  fieldName: string;
  section: InvoiceSection;
  fieldLabel: string;
  editableBy: EditorRole;
}

// All possible invoice sections
export type InvoiceSection = 
  | 'Invoice Details' 
  | 'Order Information' 
  | 'Order Charges Breakdown' 
  | 'Service Provider Information' 
  | 'Invoice Activity Log';

// Invoice field permissions mapping based on the provided table
export const invoiceFieldPermissions: FieldPermission[] = [
  // Invoice Details Section
  { fieldName: "invoiceNumber", section: "Invoice Details", fieldLabel: "Invoice ID", editableBy: "Admin/Authorized Employee" },
  { fieldName: "issueDate", section: "Invoice Details", fieldLabel: "Issue Date & Time", editableBy: "System" },
  { fieldName: "isBillable", section: "Invoice Details", fieldLabel: "Billable (Yes/No)", editableBy: "Admin/Authorized Employee" },
  
  // Order Information Section
  { fieldName: "orderId", section: "Order Information", fieldLabel: "Order ID", editableBy: "System" },
  { fieldName: "customerName", section: "Order Information", fieldLabel: "Customer Name", editableBy: "System" },
  { fieldName: "corporateName", section: "Order Information", fieldLabel: "Corporate Name (if applicable)", editableBy: "System" },
  { fieldName: "serviceType", section: "Order Information", fieldLabel: "Service Type", editableBy: "System" },
  { fieldName: "pickupLocation", section: "Order Information", fieldLabel: "Pickup Location", editableBy: "System" },
  { fieldName: "dropoffLocation", section: "Order Information", fieldLabel: "Drop-off Location", editableBy: "System" },
  { fieldName: "orderStartTime", section: "Order Information", fieldLabel: "Order Start Time", editableBy: "System" },
  { fieldName: "orderCompletionTime", section: "Order Information", fieldLabel: "Order Completion Time", editableBy: "System" },
  
  // Order Charges Breakdown Section
  { fieldName: "baseServiceFee", section: "Order Charges Breakdown", fieldLabel: "Base Service Fee", editableBy: "Admin/Authorized Employee" },
  { fieldName: "distanceCost", section: "Order Charges Breakdown", fieldLabel: "Distance Cost", editableBy: "Admin/Authorized Employee" },
  { fieldName: "taxAmount", section: "Order Charges Breakdown", fieldLabel: "VAT", editableBy: "System" },
  { fieldName: "amount", section: "Order Charges Breakdown", fieldLabel: "Total (Before & After VAT)", editableBy: "Admin/Authorized Employee" },
  
  // Service Provider Information Section
  { fieldName: "providerName", section: "Service Provider Information", fieldLabel: "Provider Name", editableBy: "System" },
  { fieldName: "providerPhone", section: "Service Provider Information", fieldLabel: "Provider Phone", editableBy: "System" },
  { fieldName: "providerCompany", section: "Service Provider Information", fieldLabel: "Provider Company (if applicable)", editableBy: "System" },
  { fieldName: "amountDueToProvider", section: "Service Provider Information", fieldLabel: "Amount Due to Provider", editableBy: "Admin Only" },
  { fieldName: "providerBonus", section: "Service Provider Information", fieldLabel: "Provider Bonus", editableBy: "Admin Only" },
  
  // Invoice Activity Log Section
  { fieldName: "createdAt", section: "Invoice Activity Log", fieldLabel: "Invoice Created At", editableBy: "System" },
  { fieldName: "lastModifiedAt", section: "Invoice Activity Log", fieldLabel: "Invoice Last Modified At", editableBy: "System" },
  { fieldName: "markedBillableBy", section: "Invoice Activity Log", fieldLabel: "Marked Billable By", editableBy: "Admin/Authorized Employee" },
  { fieldName: "internalNotes", section: "Invoice Activity Log", fieldLabel: "Internal Notes", editableBy: "Admin/Authorized Employee" },
];

// Helper function to check if a field is editable by a specific role
export function isFieldEditable(fieldName: string, userRole: string): boolean {
  const field = invoiceFieldPermissions.find(p => p.fieldName === fieldName);
  
  if (!field) return false;
  
  // For now, let's assume Admin can do everything, and Authorized Employee can do what's allowed for them
  if (userRole === 'Admin' || userRole === 'SuperAdmin') {
    return true;
  } else if (userRole === 'AuthorizedEmployee') {
    return field.editableBy === 'Admin/Authorized Employee';
  }
  
  return false;
}

// Get a field permission by fieldName
export function getFieldPermission(fieldName: string): FieldPermission | undefined {
  return invoiceFieldPermissions.find(p => p.fieldName === fieldName);
}
