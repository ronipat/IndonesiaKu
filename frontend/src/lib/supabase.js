import { createClient } from '@supabase/supabase-js';

const rawUrl = String(import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawAnonKey = String(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    ''
).trim();

const hasValidUrl =
  /^https?:\/\/.+/i.test(rawUrl) && !rawUrl.includes('your-project-ref');
const hasValidKey =
  rawAnonKey.length > 0 && !rawAnonKey.includes('your-supabase-anon-key');

export const isSupabaseConfigured = hasValidUrl && hasValidKey;
export const supabaseUrl = hasValidUrl ? rawUrl.replace(/\/+$/, '') : '';
export const supabaseAnonKey = hasValidKey ? rawAnonKey : '';
export const useAdminEdgeFunction =
  String(import.meta.env.VITE_USE_ADMIN_EDGE_FUNCTION || '').toLowerCase() === 'true';

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
