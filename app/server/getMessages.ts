"use server";

import { prisma } from "@lib";
import { getCurrentConversationId } from "./getCurrentConversationId";

export const getMessages = async () => {
  const currentConversationId = await getCurrentConversationId();
  // find the current user's messages and then filter them by message.conversationId === currentConversationId
  const messages = await prisma.message.findMany({
    where: {
      conversationId: currentConversationId,
    },
    include: {
      user: true,
    },
  });
  return messages;
};
