"use server";

import { prisma } from "@lib";
import { getHumanUser } from "./getHumanUser";

export const getCurrentConversation = async () => {
  const humanUser = await getHumanUser();
  const currentConversationId = humanUser?.currentConversationId;
  const currentConversation = await prisma.message.findMany({
    where: { conversationId: currentConversationId },
  });
  return currentConversation;
};
