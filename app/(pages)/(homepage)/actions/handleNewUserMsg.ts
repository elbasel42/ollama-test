"use server";

import { prisma } from "@lib";
import { getAiResponse, getAiUser, getHumanUser } from "@server";
import { revalidatePath } from "next/cache";

export const handleNewUserMsg = async (msg: string) => {
  const humanUser = await getHumanUser();
  const aiUser = await getAiUser();

  const aiResponse = await getAiResponse(msg);

  const newUserMessage = await prisma.message.create({
    data: {
      content: msg,
      conversationId: humanUser.currentConversationId,
      userId: humanUser.id,
    },
  });

  const newAiMessage = await prisma.message.create({
    data: {
      userId: aiUser.id,
      content: aiResponse.content.toString(),
      conversationId: humanUser.currentConversationId,
    },
  });

  revalidatePath("/");
  console.clear();
  console.log(newUserMessage.content);
  console.log(newAiMessage.content);
};
