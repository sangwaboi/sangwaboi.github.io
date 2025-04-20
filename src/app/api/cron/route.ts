import type { NextRequest } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const client = await createClient();
  const { error } = await client.from("messages").select("*").limit(1);
  if (error) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }

  return Response.json({ success: true });
}
