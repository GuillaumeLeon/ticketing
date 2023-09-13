export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          content_html: string | null
          content_text: string | null
          created_at: string
          created_by: string | null
          from: string | null
          id: number
          ticket_id: number | null
          to: string | null
          via: string | null
        }
        Insert: {
          content_html?: string | null
          content_text?: string | null
          created_at?: string
          created_by?: string | null
          from?: string | null
          id?: number
          ticket_id?: number | null
          to?: string | null
          via?: string | null
        }
        Update: {
          content_html?: string | null
          content_text?: string | null
          created_at?: string
          created_by?: string | null
          from?: string | null
          id?: number
          ticket_id?: number | null
          to?: string | null
          via?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          }
        ]
      }
      tickets: {
        Row: {
          assignee_id: string | null
          created_at: string
          deleted_at: string | null
          id: number
          is_spam: boolean | null
          last_answered_at: string | null
          read_at: string | null
          snoozed_at: string | null
          status: string
          subject: string
          tags: string[] | null
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: number
          is_spam?: boolean | null
          last_answered_at?: string | null
          read_at?: string | null
          snoozed_at?: string | null
          status?: string
          subject: string
          tags?: string[] | null
        }
        Update: {
          assignee_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: number
          is_spam?: boolean | null
          last_answered_at?: string | null
          read_at?: string | null
          snoozed_at?: string | null
          status?: string
          subject?: string
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assignee_id_fkey"
            columns: ["assignee_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
