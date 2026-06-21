import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ailxagjsbvnlqilfxuvp.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbHhhZ2pzYnZubHFpbGZ4dXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNjU0MTUsImV4cCI6MjA5NzY0MTQxNX0.YYFjHPVGpxRZg7uPC26udnMA6vxgdfX0gtM4O_JkNS0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
