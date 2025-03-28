
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Edit } from 'lucide-react';
import { Invoice } from '@/types/finance';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore, translations } from '@/lib/i18n';
import { EditorRole, getFieldPermission } from '@/types/permissions';
import { useState } from 'react';

interface InvoiceFieldRowProps {
  label: string;
  value: string | number | boolean | React.ReactNode;
  invoice?: Invoice;
  fieldName?: string;
  onEdit?: (invoice: Invoice, field: string) => void;
  userRole?: string; // Added userRole prop
}

export function InvoiceFieldRow({ 
  label, 
  value, 
  invoice, 
  fieldName, 
  onEdit,
  userRole = 'AuthorizedEmployee' // Default role for demo purposes
}: InvoiceFieldRowProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const financeT = t.finance;
  
  // Get field permission if fieldName is provided
  const fieldPermission = fieldName ? getFieldPermission(fieldName) : undefined;
  const editableBy: EditorRole | undefined = fieldPermission?.editableBy;
  
  // Determine if the field is editable based on permissions
  const isEditable = determineEditability(editableBy, userRole);

  // Handle boolean values with badges
  const displayValue = () => {
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? "default" : "outline"}>
          {value ? financeT.yes : financeT.no}
        </Badge>
      );
    }
    return value;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{label}</TableCell>
      <TableCell>{displayValue()}</TableCell>
      <TableCell className="text-right">
        {isEditable && onEdit && invoice && fieldName && (
          <Button variant="ghost" size="sm" onClick={() => onEdit(invoice, fieldName)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

// Helper function to determine if a field is editable based on the user's role
function determineEditability(editableBy?: EditorRole, userRole?: string): boolean {
  if (!editableBy || !userRole || editableBy === 'System') {
    return false;
  }
  
  // Admin and SuperAdmin can edit any non-system field
  if (userRole === 'Admin' || userRole === 'SuperAdmin') {
    return true;
  }
  
  // Authorized Employee can only edit fields marked as 'Admin/Authorized Employee'
  if (userRole === 'AuthorizedEmployee') {
    return editableBy === 'Admin/Authorized Employee';
  }
  
  // Any other role has no edit permissions
  return false;
}
