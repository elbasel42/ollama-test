"use server";

import type { Message as UIMessage } from "ai";
import type { Message as PrismaMessage } from "@prisma/client";
import { z } from "zod";
import { getHumanUser } from "@server";
import { CreateMessage } from "../server/createMessage";

const PrismaMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "system", "assistant", "data"]),
  content: z.string(),
  createdAt: z.date(),
  toolInvocations: z.array(z.string()).optional(),
  user: z.string().optional(),
});
export const convertToPrismaMessage = async (
  message: UIMessage
): Promise<CreateMessage> => {
  const humanUser = await getHumanUser();
  const userId = humanUser.id;

  const { content, role, user } = PrismaMessageSchema.parse(message);

  console.log({ user });

  return {
    content,
    role,
    userId: role === "assistant" ? "assistant" : userId,
  };
};
