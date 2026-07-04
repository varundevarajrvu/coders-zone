import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when Supabase env vars are present, so auth features can be enabled. */
export const supabaseEnabled = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Returns a browser Supabase client, or null when not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseEnabled) return null;
  if (!client) client = createClient(url!, anonKey!);
  return client;
}
