"use server";

import { prisma } from "@lib";
import { getHumanUser } from "./getHumanUser";

export type CreateMessage = {
  content: string;
  role: string;
  userId: string;
  conversationId?: string;
};

export const createMessage = async (message: CreateMessage) => {
  const humanUser = await getHumanUser();

  const conversationId = humanUser.currentConversationId;
  const newMessage = await prisma.message.create({
    data: {
      conversationId,
      content: message.content,
      role: message.role,
      userId: message.userId,
    },
  });

  return newMessage;
};
