"use server";

import { prisma } from "@lib";
export const getAiUser = async () => {
  const existingAiUser = await prisma.user.findFirst({
    where: {
      id: "assistant",
    },
  });

  return existingAiUser;
};
