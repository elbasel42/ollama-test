"use server";

import { prisma } from "@lib";

type Args = {
  id?: number;
  name: string;
  email: string;
};
export const createUser = async ({ id, name, email }: Args) => {
  const user = {
    id,
    name: name ?? "N/A",
    email: email ?? "N/A",
  };

  await prisma.user.create({ data: user });

  return user;
};
