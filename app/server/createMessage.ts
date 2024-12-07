"use server";

import { prisma } from "@lib";

export type CreateMessage = {
  content: string;
  role: string;
  userId: string;
};
export const createMessage = async (message: CreateMessage) => {

  const newMessage = await prisma.message.create({
    data: {
      content: message.content,
      role: message.role,
      userId: message.userId,
    },
  });

  return newMessage;
};
