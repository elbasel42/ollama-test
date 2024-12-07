"use server";

import { prisma } from "@lib";

export const getMessages = async () => {
  const messages = await prisma.message.findMany({});
  return messages;
};
