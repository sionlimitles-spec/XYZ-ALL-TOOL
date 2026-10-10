"use client";
import { createClient } from "@/lib/supabase/client";

export async function logHistory(
  toolSlug: string,
  action: string,
  input: string,
  summary: string
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("history").insert({
    user_id: user.id,
    tool_slug: toolSlug,
    action,
    input,
    result_summary: summary,
  });
}
