"use server";

import { prisma } from "@lib";
import { setUserId } from "@server";
// import { setCurrentConversationId } from "@server";

type Args = {
  id?: string;
  name: string;
};

export const createUser = async ({ id, name }: Args) => {
  const newUser = await prisma.user.create({
    data: {
      id,
      name,
    },
  });

  // await setCurrentConversationId(newUser.currentConversationId);
  await setUserId(newUser.id);

  return newUser;
};
