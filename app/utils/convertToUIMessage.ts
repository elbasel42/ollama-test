import { Message as DBMessage } from "@prisma/client";
import { Message as UIMessage } from "ai";
import { z } from "zod";

const DBMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "system", "assistant", "data"]),
  content: z.string(),
  createdAt: z.date(),
  toolInvocations: z.array(z.string()).optional(),
  user: z.string().optional(),
});

export const convertToUIMessage = (message: DBMessage): UIMessage => {
  const parsedMessage = DBMessageSchema.parse(message);

  const uiMessage: UIMessage = {
    id: parsedMessage.id,
    role: parsedMessage.role,
    content: parsedMessage.content,
    createdAt: parsedMessage.createdAt,
  };

  return uiMessage;
};
