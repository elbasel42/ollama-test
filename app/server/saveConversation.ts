"use server";

import { prisma } from "@lib";
import { convertToPrismaMessage } from "@utils";
import { Message } from "ai";

type Conversation = {
  messages: Message[];
};

export const saveConversation = async ({ messages }: Conversation) => {
  const prismaMessages = await Promise.all(
    messages.map(async (m) => await convertToPrismaMessage(m))
  );

  await prisma.message.createMany({
    data: prismaMessages,
  });
};
