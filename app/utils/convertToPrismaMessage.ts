"use server";

import type { Message as UIMessage } from "ai";
// import type { Message as PrismaMessage } from "@prisma/client";
import { z } from "zod";
import { getHumanUser } from "@server";
import { CreateMessage } from "../server/createMessage";
import { Message } from "@prisma/client";
import { prisma } from "@lib";

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
): Promise<Message> => {
  const humanUser = await getHumanUser();
  const userId = humanUser?.id;
  const currentConversationId = humanUser?.currentConversationId;

  const { id, createdAt, content, role, user } =
    PrismaMessageSchema.parse(message);

  console.log({ user });


  return {
    id,
    conversationId: currentConversationId ?? "",
    createdAt,
    content,
    role,
    userId: role === "assistant" ? "assistant" : userId ?? "",
  };
};
