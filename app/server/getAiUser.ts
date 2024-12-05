import { prisma } from "@lib";
import { createUser } from "./createUser";

export const getAiUser = async () => {
  const dbAiUser = await prisma.user.findFirst({
    where: {
      id: -1,
    },
  });

  if (dbAiUser) return dbAiUser;

  const aiUser = await createUser({ id: -1, name: "AI", email: "ai@ai.com" });

  return aiUser;
};
