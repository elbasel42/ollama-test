"use client";

import { useChat } from "ai/react";
import type { Message } from "ai";
import { ChatForm } from "./ChatForm";
import { Output } from "./Output";
import { prisma } from "@lib";
import { getHumanUser, saveConversation } from "@server";
import { convertToPrismaMessage } from "@utils";
// import { Message } from "@prisma/client";
// import { useOptimistic } from "react";
// import { handleNewUserMsg } from "../(pages)/(homepage)/actions";
// import { clearMessages, getHumanUser } from "@server";

interface ChatProps {
  initialMessages: Message[];
}

export const Chat = ({ initialMessages }: ChatProps) => {
  const { stop, isLoading, append, messages, setMessages } = useChat({
    initialMessages,
  });

  const secondaryAction = async () => {
    await saveConversation({ messages });
    setMessages([]);
  };
  return (
    <>
      <Output messages={messages} />
      <ChatForm
        onSecondaryButtonClick={secondaryAction}
        stop={stop}
        append={append}
        isLoading={isLoading}
      />
    </>
  );
};
