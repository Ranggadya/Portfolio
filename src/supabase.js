// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjewhtugfgzcjxdhuknv.supabase.co' ; // ganti dengan project URL-mu
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZXdodHVnZmd6Y2p4ZGh1a252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTMyNTksImV4cCI6MjA2Nzg4OTI1OX0.0njkAtqi3JJX664RL9vA7TvPxdOErUbUjDeQNsjq2z4'; // ganti dengan public anon key-mu

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
