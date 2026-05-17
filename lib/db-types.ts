/**
 * Database Type Definitions
 * TypeScript types for Supabase tables
 */

export interface Profile {
  id: string; // UUID, references auth.users
  username: string;
  is_admin: boolean;
  use_pin: boolean;
  pin_hash: string | null;
  created_at: string;
  updated_at: string;
  disabled_at: string | null;
}

export interface Category {
  id: string; // UUID
  user_id: string;
  name: string;
  color: string | null;
  icon: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string; // UUID
  user_id: string;
  category_id: string | null;
  title: string;
  content: string;
  is_completed: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  user_id: string; // UUID, primary key
  theme_mode: 'light' | 'dark';
  theme_name: string;
  last_route: string | null;
  preferences: Record<string, any>;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string; // UUID
  user_id: string;
  event_type: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface SearchHistory {
  id: string; // UUID
  user_id: string;
  query: string;
  results_count: number;
  created_at: string;
}

// Supabase Database type (for TypeScript client)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'user_id' | 'created_at'>>;
      };
      notes: {
        Row: Note;
        Insert: Omit<Note, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Note, 'id' | 'user_id' | 'created_at'>>;
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: Omit<UserPreferences, 'updated_at'>;
        Update: Partial<Omit<UserPreferences, 'user_id'>>;
      };
      analytics_events: {
        Row: AnalyticsEvent;
        Insert: Omit<AnalyticsEvent, 'id' | 'created_at'>;
        Update: never; // Analytics events are immutable
      };
      search_history: {
        Row: SearchHistory;
        Insert: Omit<SearchHistory, 'id' | 'created_at'>;
        Update: never; // Search history is immutable
      };
    };
  };
}

// Helper types for API responses
export type NoteWithCategory = Note & {
  category: Pick<Category, 'name' | 'color' | 'icon'> | null;
};

export type CategoryWithNotes = Category & {
  notes: Note[];
};
