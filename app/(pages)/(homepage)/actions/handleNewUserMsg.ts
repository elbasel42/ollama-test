"use server";

import { createMessage, getAiResponse, getAiUser, getHumanUser } from "@server";
import { revalidatePath } from "next/cache";

export const handleNewUserMsg = async (msg: string) => {
  const humanUser = await getHumanUser();
  const aiUser = await getAiUser();

  const aiResponse = await getAiResponse(msg);

  const newUserMsg = await createMessage(humanUser.id, msg);
  // const aiNewMsg = await createMessage(aiUser.id, aiResponse);
  console.log({ newUserMsg });
  // const newUserMessage = await prisma.message.create({
  //   data: {
  //     content: msg,
  //     conversationId: humanUser.currentConversationId,
  //     userId: humanUser.id,
  //   },
  // });

  // for await (const chunk of aiResponse) {
  //   const content = chunk.content.toString();
  //   createMessage(aiUser.id, content);
  //   revalidatePath("/");
  // }

  // const newAiMessage = await prisma.message.create({
  //   data: {
  //     userId: aiUser.id,
  //     // content: aiResponse,
  //     conversationId: humanUser.currentConversationId,
  //   },
  // });

  console.clear();
  revalidatePath("/");
  console.log(newUserMessage.content);
  console.log(newAiMessage.content);
};
