export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      campaign_recipients: {
        Row: {
          campaign_id: string
          created_at: string
          email: string
          id: string
          prospect_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          email: string
          id?: string
          prospect_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          email?: string
          id?: string
          prospect_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_recipients_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          body_template: string | null
          created_at: string
          daily_limit: number | null
          id: string
          name: string
          send_interval_seconds: number
          status: string
          subject_template: string | null
          updated_at: string
        }
        Insert: {
          body_template?: string | null
          created_at?: string
          daily_limit?: number | null
          id?: string
          name: string
          send_interval_seconds?: number
          status?: string
          subject_template?: string | null
          updated_at?: string
        }
        Update: {
          body_template?: string | null
          created_at?: string
          daily_limit?: number | null
          id?: string
          name?: string
          send_interval_seconds?: number
          status?: string
          subject_template?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_queue: {
        Row: {
          attempt_count: number
          campaign_recipient_id: string
          created_at: string
          id: string
          last_error: string | null
          locked_at: string | null
          provider_message_id: string | null
          scheduled_for: string | null
          sent_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          campaign_recipient_id: string
          created_at?: string
          id?: string
          last_error?: string | null
          locked_at?: string | null
          provider_message_id?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          campaign_recipient_id?: string
          created_at?: string
          id?: string
          last_error?: string | null
          locked_at?: string | null
          provider_message_id?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_queue_campaign_recipient_id_fkey"
            columns: ["campaign_recipient_id"]
            isOneToOne: true
            referencedRelation: "campaign_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      import_batches: {
        Row: {
          created_at: string
          duplicate_rows: number
          id: string
          label: string | null
          new_rows: number
          raw_payload: Json | null
          rejected_rows: number
          source: string
          total_rows: number
        }
        Insert: {
          created_at?: string
          duplicate_rows?: number
          id?: string
          label?: string | null
          new_rows?: number
          raw_payload?: Json | null
          rejected_rows?: number
          source: string
          total_rows?: number
        }
        Update: {
          created_at?: string
          duplicate_rows?: number
          id?: string
          label?: string | null
          new_rows?: number
          raw_payload?: Json | null
          rejected_rows?: number
          source?: string
          total_rows?: number
        }
        Relationships: []
      }
      outbound_settings: {
        Row: {
          daily_limit: number | null
          outbound_enabled: boolean
          send_interval_seconds: number
          singleton: boolean
          updated_at: string
        }
        Insert: {
          daily_limit?: number | null
          outbound_enabled?: boolean
          send_interval_seconds?: number
          singleton?: boolean
          updated_at?: string
        }
        Update: {
          daily_limit?: number | null
          outbound_enabled?: boolean
          send_interval_seconds?: number
          singleton?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      platform_admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      practice_ingestion_runs: {
        Row: {
          completed_at: string | null
          conflicts_found: number
          created_at: string
          error_text: string | null
          id: string
          items_changed: number
          items_extracted: number
          metadata: Json
          pages_seen: number
          provider: string
          provider_job_id: string | null
          source_id: string | null
          started_at: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          completed_at?: string | null
          conflicts_found?: number
          created_at?: string
          error_text?: string | null
          id?: string
          items_changed?: number
          items_extracted?: number
          metadata?: Json
          pages_seen?: number
          provider?: string
          provider_job_id?: string | null
          source_id?: string | null
          started_at?: string | null
          status?: string
          tenant_id: string
        }
        Update: {
          completed_at?: string | null
          conflicts_found?: number
          created_at?: string
          error_text?: string | null
          id?: string
          items_changed?: number
          items_extracted?: number
          metadata?: Json
          pages_seen?: number
          provider?: string
          provider_job_id?: string | null
          source_id?: string | null
          started_at?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_ingestion_runs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "practice_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_ingestion_runs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_knowledge_conflicts: {
        Row: {
          created_at: string
          first_item_id: string | null
          id: string
          knowledge_key: string
          resolution_note: string | null
          resolved_at: string | null
          resolved_by: string | null
          second_item_id: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          first_item_id?: string | null
          id?: string
          knowledge_key: string
          resolution_note?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          second_item_id?: string | null
          status?: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          first_item_id?: string | null
          id?: string
          knowledge_key?: string
          resolution_note?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          second_item_id?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_knowledge_conflicts_first_item_id_fkey"
            columns: ["first_item_id"]
            isOneToOne: false
            referencedRelation: "practice_knowledge_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_knowledge_conflicts_second_item_id_fkey"
            columns: ["second_item_id"]
            isOneToOne: false
            referencedRelation: "practice_knowledge_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_knowledge_conflicts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_knowledge_items: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          category: string
          confidence: number | null
          created_at: string
          evidence_type: string
          id: string
          key: string
          source_excerpt: string | null
          source_id: string | null
          source_url: string | null
          tenant_id: string
          updated_at: string
          valid_from: string
          valid_to: string | null
          value_text: string
          verification_status: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          category: string
          confidence?: number | null
          created_at?: string
          evidence_type?: string
          id?: string
          key: string
          source_excerpt?: string | null
          source_id?: string | null
          source_url?: string | null
          tenant_id: string
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
          value_text: string
          verification_status?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          confidence?: number | null
          created_at?: string
          evidence_type?: string
          id?: string
          key?: string
          source_excerpt?: string | null
          source_id?: string | null
          source_url?: string | null
          tenant_id?: string
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
          value_text?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_knowledge_items_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "practice_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_knowledge_items_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_knowledge_reviews: {
        Row: {
          action: string
          created_at: string
          id: string
          knowledge_item_id: string
          new_status: string | null
          note: string | null
          previous_status: string | null
          reviewer_user_id: string | null
          tenant_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          knowledge_item_id: string
          new_status?: string | null
          note?: string | null
          previous_status?: string | null
          reviewer_user_id?: string | null
          tenant_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          knowledge_item_id?: string
          new_status?: string | null
          note?: string | null
          previous_status?: string | null
          reviewer_user_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_knowledge_reviews_knowledge_item_id_fkey"
            columns: ["knowledge_item_id"]
            isOneToOne: false
            referencedRelation: "practice_knowledge_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_knowledge_reviews_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_knowledge_versions: {
        Row: {
          change_type: string
          created_at: string
          created_by: string | null
          evidence_type: string
          id: string
          knowledge_item_id: string
          source_excerpt: string | null
          source_url: string | null
          tenant_id: string
          value_text: string
        }
        Insert: {
          change_type?: string
          created_at?: string
          created_by?: string | null
          evidence_type: string
          id?: string
          knowledge_item_id: string
          source_excerpt?: string | null
          source_url?: string | null
          tenant_id: string
          value_text: string
        }
        Update: {
          change_type?: string
          created_at?: string
          created_by?: string | null
          evidence_type?: string
          id?: string
          knowledge_item_id?: string
          source_excerpt?: string | null
          source_url?: string | null
          tenant_id?: string
          value_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_knowledge_versions_knowledge_item_id_fkey"
            columns: ["knowledge_item_id"]
            isOneToOne: false
            referencedRelation: "practice_knowledge_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_knowledge_versions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_sources: {
        Row: {
          content_hash: string | null
          created_at: string
          fetch_status: string
          id: string
          last_changed_at: string | null
          last_error: string | null
          last_fetched_at: string | null
          next_refresh_at: string | null
          raw_metadata: Json
          source_type: string
          source_url: string | null
          status: string
          tenant_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          content_hash?: string | null
          created_at?: string
          fetch_status?: string
          id?: string
          last_changed_at?: string | null
          last_error?: string | null
          last_fetched_at?: string | null
          next_refresh_at?: string | null
          raw_metadata?: Json
          source_type?: string
          source_url?: string | null
          status?: string
          tenant_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          content_hash?: string | null
          created_at?: string
          fetch_status?: string
          id?: string
          last_changed_at?: string | null
          last_error?: string | null
          last_fetched_at?: string | null
          next_refresh_at?: string | null
          raw_metadata?: Json
          source_type?: string
          source_url?: string | null
          status?: string
          tenant_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_sources_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      prospects: {
        Row: {
          address: string | null
          chatbot_present: boolean | null
          city: string | null
          contact_name: string | null
          contact_title: string | null
          created_at: string
          domain: string | null
          email: string | null
          google_rating: number | null
          google_reviews: number | null
          id: string
          next_follow_up_at: string | null
          notes: string | null
          online_booking_present: boolean | null
          opportunity_score: number | null
          phone: string | null
          postal_code: string | null
          practice_name: string
          seo_geo_score: number | null
          source: string
          source_url: string | null
          stage: string
          state: string | null
          updated_at: string
          verification_status: string
          website: string | null
          website_score: number | null
        }
        Insert: {
          address?: string | null
          chatbot_present?: boolean | null
          city?: string | null
          contact_name?: string | null
          contact_title?: string | null
          created_at?: string
          domain?: string | null
          email?: string | null
          google_rating?: number | null
          google_reviews?: number | null
          id?: string
          next_follow_up_at?: string | null
          notes?: string | null
          online_booking_present?: boolean | null
          opportunity_score?: number | null
          phone?: string | null
          postal_code?: string | null
          practice_name: string
          seo_geo_score?: number | null
          source?: string
          source_url?: string | null
          stage?: string
          state?: string | null
          updated_at?: string
          verification_status?: string
          website?: string | null
          website_score?: number | null
        }
        Update: {
          address?: string | null
          chatbot_present?: boolean | null
          city?: string | null
          contact_name?: string | null
          contact_title?: string | null
          created_at?: string
          domain?: string | null
          email?: string | null
          google_rating?: number | null
          google_reviews?: number | null
          id?: string
          next_follow_up_at?: string | null
          notes?: string | null
          online_booking_present?: boolean | null
          opportunity_score?: number | null
          phone?: string | null
          postal_code?: string | null
          practice_name?: string
          seo_geo_score?: number | null
          source?: string
          source_url?: string | null
          stage?: string
          state?: string | null
          updated_at?: string
          verification_status?: string
          website?: string | null
          website_score?: number | null
        }
        Relationships: []
      }
      suppressions: {
        Row: {
          created_at: string
          email: string
          id: string
          normalized_email: string | null
          reason: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          normalized_email?: string | null
          reason: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          normalized_email?: string | null
          reason?: string
          source?: string | null
        }
        Relationships: []
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
