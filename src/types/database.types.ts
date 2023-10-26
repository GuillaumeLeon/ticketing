export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      messages: {
        Row: {
          content_html: string
          content_text: string
          created_at: string
          created_by: string | null
          direction: string
          firstname: string | null
          from: string
          id: number
          lastname: string | null
          message_id: string
          ticket_id: number
          to: string
          via: string
        }
        Insert: {
          content_html: string
          content_text: string
          created_at?: string
          created_by?: string | null
          direction: string
          firstname?: string | null
          from: string
          id?: number
          lastname?: string | null
          message_id: string
          ticket_id: number
          to: string
          via: string
        }
        Update: {
          content_html?: string
          content_text?: string
          created_at?: string
          created_by?: string | null
          direction?: string
          firstname?: string | null
          from?: string
          id?: number
          lastname?: string | null
          message_id?: string
          ticket_id?: number
          to?: string
          via?: string
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
          is_spam: boolean
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
          is_spam?: boolean
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
          is_spam?: boolean
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
      add_role: {
        Args: {
          user_id: string
          role_id: string
        }
        Returns: undefined
      }
      add_role_by_name: {
        Args: {
          user_id: string
          role_name: string
        }
        Returns: undefined
      }
      link_role_to_permissions: {
        Args: {
          role_id: string
          type: string
          object: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  rbac: {
    Tables: {
      permission: {
        Row: {
          action: string | null
          created_at: string
          deleted_at: string | null
          id: string
          object: string
          type: string
          updated_at: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          object: string
          type: string
          updated_at?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          object?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      role: {
        Row: {
          active: boolean | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      role_permission: {
        Row: {
          created_at: string
          deleted_at: string | null
          permission_id: string
          role_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          permission_id: string
          role_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          permission_id?: string
          role_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_permission_permission_id_fkey"
            columns: ["permission_id"]
            referencedRelation: "permission"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permission_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "role"
            referencedColumns: ["id"]
          }
        ]
      }
      user_role: {
        Row: {
          created_at: string
          deleted_at: string | null
          role_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          role_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          role_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      granular_permissions: {
        Row: {
          permission: string | null
          role: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

