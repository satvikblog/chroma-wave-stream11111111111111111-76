
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client from the integrations folder
export const supabase = supabaseClient;

// Define database types
export type Week = {
  id: number;
  name: string;
  created_at: string;
};

export type Topic = {
  id: number;
  name: string;
  week_id: number;
  created_at: string;
};

export type Video = {
  id: number;
  title: string;
  embed_url: string;
  topic_id: number;
  created_at: string;
};
