"use server";

import { prisma } from "@lib";
import { getHumanUser } from "./getHumanUser";

export const getCurrentConversation = async () => {
  const humanUser = await getHumanUser();
  // const currentConversation = await prisma.conversation.findUnique({
  //   where: { id: humanUser?.currentConversationId },
  // });
  console.log({ humanUser });

  const currentConversation = humanUser?.conversations.find((c) => {
    return c.id === humanUser.currentConversationId;
  });
  return currentConversation?.messages;
  // const currentMessages = await prisma.message.findMany({
  // where: { conversationId: humanUser?.currentConversationId },
  // });
  // console.log({ currentMessages });
  // const currentConversationId = humanUser?.currentConversationId;
  // const currentConversation = await prisma.message.findMany({
  //   where: { conversationId: currentConversationId },
  // });
  // return currentMessages;
};
