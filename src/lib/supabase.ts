import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Sanitizes and validates a Supabase project URL.
 * Returns valid URL origin or null if invalid (e.g. if an API key was accidentally entered).
 */
export function sanitizeSupabaseUrl(raw: string | undefined): string | null {
  if (!raw || typeof raw !== 'string') return null;
  let str = raw.trim().replace(/^["'`]|["'`]$/g, '');
  if (!str) return null;

  // If user entered just domain without protocol (e.g. "myproject.supabase.co")
  if (
    /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9._-]+)+/i.test(str) &&
    !str.startsWith('http://') &&
    !str.startsWith('https://')
  ) {
    str = 'https://' + str;
  }

  // Must strictly start with http:// or https://
  if (!str.startsWith('http://') && !str.startsWith('https://')) {
    return null;
  }

  try {
    const u = new URL(str);
    // Must have a valid protocol and a hostname containing a dot
    if ((u.protocol === 'http:' || u.protocol === 'https:') && u.hostname.includes('.')) {
      return u.origin;
    }
  } catch {
    return null;
  }
  return null;
}

const rawEnvUrl: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const rawEnvKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

const sanitizedUrl = sanitizeSupabaseUrl(rawEnvUrl);

// Key validation
const isValidKey = Boolean(
  rawEnvKey &&
  typeof rawEnvKey === 'string' &&
  rawEnvKey.trim().length > 15 &&
  !rawEnvKey.includes('your-anon-key') &&
  !rawEnvKey.includes('placeholder')
);

// Diagnostic warning message for user in Admin CMS
export let supabaseConfigWarning: string | null = null;

if (rawEnvUrl && !sanitizedUrl) {
  supabaseConfigWarning = `Format VITE_SUPABASE_URL tidak valid ("${rawEnvUrl}"). Nilai ini harus berupa URL project Supabase (contoh: https://xxxxxxxx.supabase.co), bukan API key atau token.`;
} else if (rawEnvUrl && !isValidKey) {
  supabaseConfigWarning = 'VITE_SUPABASE_ANON_KEY belum diisi dengan kunci yang valid.';
}

export const isSupabaseConfigured = Boolean(
  sanitizedUrl &&
  !sanitizedUrl.includes('placeholder') &&
  !sanitizedUrl.includes('your-project-id') &&
  isValidKey
);

// Safe fallback URL & Anon Key so createClient will NEVER throw or crash the app on startup
const SAFE_FALLBACK_URL = 'https://placeholder.supabase.co';
const SAFE_FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

const targetUrl = (isSupabaseConfigured && sanitizedUrl) ? sanitizedUrl : SAFE_FALLBACK_URL;
const targetKey = (isSupabaseConfigured && rawEnvKey) ? rawEnvKey : SAFE_FALLBACK_KEY;

function initSupabase(): SupabaseClient {
  try {
    return createClient(targetUrl, targetKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn('Failed to initialize Supabase with current env, falling back to dummy client:', err);
    return createClient(SAFE_FALLBACK_URL, SAFE_FALLBACK_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
}

export const supabase: SupabaseClient = initSupabase();
