"use server";

import { prisma } from "@lib";
import { getAiResponse, getAiUser, getHumanUser } from "@server";
import { revalidatePath } from "next/cache";

export const handleNewUserMsg = async (msg: string) => {
  const aiResponse = await getAiResponse(msg);
  const aiUser = await getAiUser();
  const humanUser = await getHumanUser();

  const newUserMessage = await prisma.message.create({
    data: {
      user: { connect: { id: humanUser.id } },
      content: msg,
      title: "",
    },
  });
  const newAiMessage = await prisma.message.create({
    data: {
      user: { connect: { id: aiUser.id } },
      content: aiResponse.content.toString(),
      title: "",
    },
  });

  revalidatePath("/");
  console.clear();
  console.log(newUserMessage.content);
  console.log(newAiMessage.content);
};
