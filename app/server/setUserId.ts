"use server";

import { cookies } from "next/headers";

export const setUserId = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set("userId", id);
};
