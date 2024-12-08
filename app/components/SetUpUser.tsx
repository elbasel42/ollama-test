"use client";

import { createUser, getAiUser, getUserId } from "@server";
import { useEffect } from "react";

export const SetUpUser = () => {
  const setUpUser = async () => {
    const userId = await getUserId();
    const aiUser = await getAiUser();
    if (!aiUser) {
      await createUser({ id: "assistant", name: "AI" });
    }
    if (!userId) {
      await createUser({ name: "Human" });
    }
  };

  useEffect(() => {
    const userIsSet = localStorage.getItem("userIsSet")?.toString();
    if (userIsSet) return;
    if (!window) return;
    setUpUser();
  }, []);

  return null;
};
