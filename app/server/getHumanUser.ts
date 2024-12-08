"use server";

import { prisma } from "@lib";
import { getUserId } from "@server";

export const getHumanUser = async () => {
  const userId = await getUserId();

  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      conversations: {
        include: {
          messages: true,
        },
      },
    },
  });

  // const newHumanUser = await createUser({ name: "Human" });
  // if (existingUser) return existingUser;

  return existingUser;
};
