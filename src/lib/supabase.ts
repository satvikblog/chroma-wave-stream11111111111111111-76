
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

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

// Type-safe versions of Supabase queries
export const getWeeks = () => 
  supabase.from('weeks').select('*').order('id');

export const getTopics = () => 
  supabase.from('topics').select('*').order('id');

export const getVideos = () => 
  supabase.from('videos').select('*').order('id');

export const addWeek = (name: string) => 
  supabase.from('weeks').insert([{ name }]).select();

export const addTopic = (name: string, week_id: number) => 
  supabase.from('topics').insert([{ name, week_id }]).select();

export const addVideo = (title: string, embed_url: string, topic_id: number) => 
  supabase.from('videos').insert([{ title, embed_url, topic_id }]).select();

export const deleteWeek = (id: number) => 
  supabase.from('weeks').delete().eq('id', id);

export const deleteTopic = (id: number) => 
  supabase.from('topics').delete().eq('id', id);

export const deleteVideo = (id: number) => 
  supabase.from('videos').delete().eq('id', id);
