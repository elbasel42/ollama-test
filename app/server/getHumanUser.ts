import { prisma } from "@lib";
import { createUser } from "./createUser";

export const getHumanUser = async () => {
  const dbAiUser = await prisma.user.findFirst({
    where: {
      id: 0,
    },
  });

  if (dbAiUser) return dbAiUser;

  const humanUser = await createUser({ id: 0, name: "Human", email: "human@human.com" });

  return humanUser;
};
