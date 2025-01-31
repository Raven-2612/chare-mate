import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://klcmbbsqvbjxdjhtqzyf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY21iYnNxdmJqeGRqaHRxenlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMDcyMDYsImV4cCI6MjA1Mzg4MzIwNn0.VLghcwLEqlbXj-f1g8eUs_qwfcku-TWMMuQhPq3PV80";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
