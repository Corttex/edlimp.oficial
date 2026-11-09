import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rnylxckvulyrlasfgqhd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_VMA5BKX3d6VWHzkwpt3EjA_n6yx_w5t';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
