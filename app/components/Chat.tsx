"use client";

import { useChat } from "ai/react";
import type { Message } from "ai";
import { ChatForm } from "./ChatForm";
import { Output } from "./Output";
import { saveConversation } from "@server";

interface ChatProps {
  initialMessages: Message[];
}

export const Chat = ({ initialMessages }: ChatProps) => {
  const { stop, isLoading, append, messages, setMessages } = useChat({
    initialMessages,
  });

  const secondaryAction = async () => {
    const initialMessagesLength = initialMessages.length;
    const newMessages = messages.slice(initialMessagesLength);
    stop();
    await saveConversation({ messages: newMessages });
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
