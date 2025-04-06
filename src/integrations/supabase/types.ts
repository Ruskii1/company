export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_pending_approvals: {
        Row: {
          provider_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          provider_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          provider_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_pending_approvals_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: true
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      cancellation_fees: {
        Row: {
          amount: number
          charged_at: string
          created_at: string
          customer_name: string
          id: string
          order_id: string
          reason: string | null
        }
        Insert: {
          amount: number
          charged_at?: string
          created_at?: string
          customer_name: string
          id?: string
          order_id: string
          reason?: string | null
        }
        Update: {
          amount?: number
          charged_at?: string
          created_at?: string
          customer_name?: string
          id?: string
          order_id?: string
          reason?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          customer_name: string
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          order_id: string
          provider_name: string
          service_type: string
          status: string
          tax_amount: number
        }
        Insert: {
          amount: number
          created_at?: string
          customer_name: string
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          order_id: string
          provider_name: string
          service_type: string
          status: string
          tax_amount: number
        }
        Update: {
          amount?: number
          created_at?: string
          customer_name?: string
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          order_id?: string
          provider_name?: string
          service_type?: string
          status?: string
          tax_amount?: number
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string
          payment_date: string
          payment_method: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          invoice_id: string
          payment_date?: string
          payment_method: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string
          payment_date?: string
          payment_method?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_requests: {
        Row: {
          car_info: Json
          created_at: string
          customer_name: string
          customer_notes: string | null
          customer_phone: string
          id: string
          location_log: Json[] | null
          provider_id: string
          request_type: string
          required_images: number
          status: string
          task_id: string
          uploaded_images: Json[] | null
        }
        Insert: {
          car_info: Json
          created_at?: string
          customer_name: string
          customer_notes?: string | null
          customer_phone: string
          id?: string
          location_log?: Json[] | null
          provider_id: string
          request_type: string
          required_images?: number
          status?: string
          task_id: string
          uploaded_images?: Json[] | null
        }
        Update: {
          car_info?: Json
          created_at?: string
          customer_name?: string
          customer_notes?: string | null
          customer_phone?: string
          id?: string
          location_log?: Json[] | null
          provider_id?: string
          request_type?: string
          required_images?: number
          status?: string
          task_id?: string
          uploaded_images?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_requests_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_status: {
        Row: {
          camera_on: boolean
          last_active: string
          notifications_on: boolean
          provider_id: string
          status: string
        }
        Insert: {
          camera_on?: boolean
          last_active?: string
          notifications_on?: boolean
          provider_id: string
          status?: string
        }
        Update: {
          camera_on?: boolean
          last_active?: string
          notifications_on?: boolean
          provider_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_status_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: true
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_wallet: {
        Row: {
          balance: number
          is_affiliated: boolean
          provider_id: string
          transactions: Json[] | null
        }
        Insert: {
          balance?: number
          is_affiliated?: boolean
          provider_id: string
          transactions?: Json[] | null
        }
        Update: {
          balance?: number
          is_affiliated?: boolean
          provider_id?: string
          transactions?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_wallet_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: true
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          car_license_url: string | null
          created_at: string | null
          driving_license_url: string | null
          email: string
          extra_note: string | null
          extra_photos: Json | null
          first_name: string
          id: string
          is_approved: boolean | null
          is_company: boolean | null
          national_id: string
          nid_photo_url: string | null
          password: string
          personal_photo_url: string | null
          phone: string
          second_name: string
          status: string | null
          third_name: string
          wallet_balance: number | null
        }
        Insert: {
          car_license_url?: string | null
          created_at?: string | null
          driving_license_url?: string | null
          email: string
          extra_note?: string | null
          extra_photos?: Json | null
          first_name: string
          id?: string
          is_approved?: boolean | null
          is_company?: boolean | null
          national_id: string
          nid_photo_url?: string | null
          password: string
          personal_photo_url?: string | null
          phone: string
          second_name: string
          status?: string | null
          third_name: string
          wallet_balance?: number | null
        }
        Update: {
          car_license_url?: string | null
          created_at?: string | null
          driving_license_url?: string | null
          email?: string
          extra_note?: string | null
          extra_photos?: Json | null
          first_name?: string
          id?: string
          is_approved?: boolean | null
          is_company?: boolean | null
          national_id?: string
          nid_photo_url?: string | null
          password?: string
          personal_photo_url?: string | null
          phone?: string
          second_name?: string
          status?: string | null
          third_name?: string
          wallet_balance?: number | null
        }
        Relationships: []
      }
      providers_location: {
        Row: {
          heading: number | null
          lat: number
          lng: number
          provider_id: string
          speed: number | null
          updated_at: string | null
        }
        Insert: {
          heading?: number | null
          lat: number
          lng: number
          provider_id: string
          speed?: number | null
          updated_at?: string | null
        }
        Update: {
          heading?: number | null
          lat?: number
          lng?: number
          provider_id?: string
          speed?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      requests: {
        Row: {
          arrived_at: string | null
          assigned_at: string | null
          auto_launch_time: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          car: Json | null
          city: string | null
          company_name: string | null
          completed_at: string | null
          created_at: string | null
          dropoff_location: string
          dropoff_photos: Json[] | null
          employee_name: string | null
          id: string
          manual_assignment: boolean | null
          notes: string | null
          pickup_location: string
          pickup_photos: Json[] | null
          pickup_time: string
          provider_id: string | null
          provider_phone: string | null
          service_type: string
          status: Database["public"]["Enums"]["request_status"]
          task_id: string | null
        }
        Insert: {
          arrived_at?: string | null
          assigned_at?: string | null
          auto_launch_time?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          car?: Json | null
          city?: string | null
          company_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          dropoff_location: string
          dropoff_photos?: Json[] | null
          employee_name?: string | null
          id?: string
          manual_assignment?: boolean | null
          notes?: string | null
          pickup_location: string
          pickup_photos?: Json[] | null
          pickup_time: string
          provider_id?: string | null
          provider_phone?: string | null
          service_type: string
          status?: Database["public"]["Enums"]["request_status"]
          task_id?: string | null
        }
        Update: {
          arrived_at?: string | null
          assigned_at?: string | null
          auto_launch_time?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          car?: Json | null
          city?: string | null
          company_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          dropoff_location?: string
          dropoff_photos?: Json[] | null
          employee_name?: string | null
          id?: string
          manual_assignment?: boolean | null
          notes?: string | null
          pickup_location?: string
          pickup_photos?: Json[] | null
          pickup_time?: string
          provider_id?: string | null
          provider_phone?: string | null
          service_type?: string
          status?: Database["public"]["Enums"]["request_status"]
          task_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_admin_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_customer_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_employee_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_provider_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_request_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_ticket_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      set_inactive_providers_offline: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      request_status:
        | "Scheduled"
        | "Waiting for Provider"
        | "NPA"
        | "NPF"
        | "In Route"
        | "Arrived at Pickup Location"
        | "In Service"
        | "Complete"
        | "Cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
