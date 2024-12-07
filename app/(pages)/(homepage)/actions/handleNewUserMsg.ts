"use server";

import { createMessage, getAiResponse, getHumanUser } from "@server";
import { revalidatePath } from "next/cache";

export const handleNewUserMsg = async (msg: string): Promise<void> => {
  const humanUser = await getHumanUser();
  if (!humanUser) {
    throw new Error("Failed to retrieve human user.");
  }

  // Create the initial user message in the system
  await createMessage(humanUser.id, msg);

  // Fetch the AI response stream
  const aiResponse = await getAiResponse(msg);

  const reader = aiResponse.getReader();

  for (;;) {
    const { done, value } = await reader.read();

    if (done) break;
    const newMessage = await createMessage(-1, value);
    console.log({ newMessage });
    revalidatePath("/")
  }
  // Process AI response events as they arrive
};
