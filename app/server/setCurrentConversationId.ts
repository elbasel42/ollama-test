"use server";

import { cookies } from "next/headers";

export const setCurrentConversationId = async (conversationId: string) => {
  const cookieStore = await cookies();
  cookieStore.set("conversationId", conversationId);
};
