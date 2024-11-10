"use server";
import { createClient } from "../utils/supabase/server";

// todo: rate limit creating messages
export const submitMessage = async (name: string, message: string) => {
  if (message.length === 0) return;
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
