"use server";

import { prisma } from "@lib";
import { createUser } from "@server";

export const getAiUser = async () => {
  const existingAiUser = await prisma.user.findFirst({
    where: {
      id: -1,
    },
  });

  if (existingAiUser) return existingAiUser;

  const newAiUser = await createUser({ id: -1, name: "AI" });

  return newAiUser;
};
