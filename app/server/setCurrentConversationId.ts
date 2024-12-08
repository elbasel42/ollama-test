"use server";

import { prisma } from "@lib";
import { getHumanUser } from "./getHumanUser";
import { revalidatePath } from "next/cache";

export const setCurrentConversationId = async (conversationId: string) => {
  const humanUser = await getHumanUser();

  if (!humanUser) return console.error("No human user found");

  // const conversation = await prisma.conversation.findUnique({
  //   where: { id: conversationId },
  // });

  await prisma.user.update({
    where: { id: humanUser?.id },
    data: { currentConversationId: conversationId },
  });

  revalidatePath("/", "layout");
};
