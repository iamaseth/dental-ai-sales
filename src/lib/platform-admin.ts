import { supabase } from "@/integrations/supabase/client";

// RLS policy "platform admins read own membership" allows a signed-in user to
// read only their own platform_admins row, so this check is safe to run
// client-side for the login gate. It must never be used to grant privileges.
export async function isPlatformAdmin(userId: string): Promise<boolean> {
  const { data, error } = await (supabase as any)
    .from("platform_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return !error && Boolean(data);
}