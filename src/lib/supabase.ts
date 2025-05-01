
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

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
