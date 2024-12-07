"use server";

import { prisma } from "@lib";
import { createUser } from "@server";

export const getAiUser = async () => {
  const existingAiUser = await prisma.user.findFirst({
    where: {
      id: "assistant",
    },
  });

  if (existingAiUser) return existingAiUser;

  const newAiUser = await createUser({ id: "assistant", name: "AI" });

  return newAiUser;
};
