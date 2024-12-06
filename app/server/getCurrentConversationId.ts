"use server";

import { cookies } from "next/headers";

export const getCurrentConversationId = async () => {
  const cookieStore = await cookies();
  const conversationId = cookieStore.get("conversationId")?.value;
  return conversationId;
};
