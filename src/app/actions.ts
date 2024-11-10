"use server";

export const submitMessage = async (name: string, message: string) => {
  // todo: rate limit
  console.log(name, message);
};
