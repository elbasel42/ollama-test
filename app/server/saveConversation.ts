"use server";

import { prisma } from "@lib";
import { convertToPrismaMessage } from "@utils";
import { Message } from "ai";
import { getHumanUser } from "./getHumanUser";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";

type Conversation = {
  messages: Message[];
};

export const saveConversation = async ({ messages }: Conversation) => {
  const humanUser = await getHumanUser();
  const prismaMessages = await Promise.all(
    messages.map(async (m) => await convertToPrismaMessage(m))
  );

  const newId = createId();
  const existingConversation = await prisma.conversation.findFirst({
    where: {
      id: newId,
    },
  });

  if (existingConversation) return console.error("Conversation already exists");

  const newConversation = await prisma.conversation.create({
    data: {
      id: newId,
      users: {
        connect: { id: humanUser?.id },
      },
      messages: {
        create: prismaMessages,
      },
    },
  });

  await prisma.user.update({
    where: {
      id: humanUser?.id,
    },
    data: {
      currentConversationId: createId(),
    },
  });
  revalidatePath('/')
};
