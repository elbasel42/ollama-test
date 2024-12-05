"use server";

import { prisma } from "@lib";
import { revalidatePath } from "next/cache";

export const clearMessages = async () => {
  const response = await prisma.message.deleteMany();
  console.log({ response });
  revalidatePath("/");
  return response;
};
