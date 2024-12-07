import { prisma } from "@lib";
import { getCurrentConversationId } from "./getCurrentConversationId";

export const createMessage = async (userId: number, msg: string) => {
  const conversationId = await getCurrentConversationId();
  const newMessage = await prisma.message.create({
    data: {
      userId,
      content: msg,
      conversationId,
    },
  });
  return newMessage;
};
