"use server";
import { createClient } from "../utils/supabase/server";

// todo: rate limit creating messages
export const submitMessage = async (name: string, message: string) => {
  if (name.length > 75 || message.length === 0 || message.length > 420)
    throw Error();
  else if (message.trim().length < 2) {
    // silently avoid spam like "a"
    return;
  }

  const data = {
    name: name.length > 0 ? name.trim() : null,
    message: message.trim(),
  };
  const client = await createClient();
  const { error } = await client.from("messages").insert([data]);

  if (error) {
    console.error("Error creating message", error);
    throw new Error();
  }
};
