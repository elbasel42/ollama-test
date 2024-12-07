"use server";

import { prisma } from "@lib";
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

  return newUser;
};
