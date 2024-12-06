"use server";

import { prisma } from "@lib";

export const saveConversation = async () => {
  const newConversation = await prisma.conversation.create({});

  return newConversation;
};
