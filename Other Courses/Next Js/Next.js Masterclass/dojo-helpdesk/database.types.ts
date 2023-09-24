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
      tickets: {
        Row: {
          body: string | null
          created_at: string
          id: number
          priority: string | null
          title: string | null
          user_email: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: number
          priority?: string | null
          title?: string | null
          user_email?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: number
          priority?: string | null
          title?: string | null
          user_email?: string | null
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
