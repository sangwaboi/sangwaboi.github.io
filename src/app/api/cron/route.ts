import type { NextRequest } from "next/server";
import { createClient } from "../../../utils/supabase/server";

// Add force-static for compatibility with static export
export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  // For static export, we'll return a mock response
  return new Response("OK", {
    status: 200,
  });
}
