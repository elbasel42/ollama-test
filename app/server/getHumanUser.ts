"use server";

import { prisma } from "@lib";
import { createUser, getUserId } from "@server";

export const getHumanUser = async () => {
  const userId = await getUserId();

  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (existingUser) return existingUser;

  const newHumanUser = await createUser({ name: "Human" });

  return newHumanUser;
};
