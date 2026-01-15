import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// Types for database tables
export interface PageView {
  id?: string;
  page: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  timestamp?: string;
  session_id?: string;
  is_unique_visitor?: boolean;
}

export interface AdminUser {
  id?: string;
  username: string;
  password_hash: string;
  email?: string;
  full_name?: string;
  is_active?: boolean;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UniqueVisitor {
  id?: string;
  ip_address: string;
  first_visit?: string;
  last_visit?: string;
  visit_count?: number;
  user_agent?: string;
  country?: string;
  city?: string;
}

export interface ConversionEvent {
  id?: string;
  event_type: string;
  event_data?: any;
  page?: string;
  user_agent?: string;
  ip_address?: string;
  timestamp?: string;
  session_id?: string;
}

export interface AnalyticsSummary {
  total_views: number;
  unique_visitors: number;
  today_views: number;
  last_7_days_views: number;
  last_30_days_views: number;
}
