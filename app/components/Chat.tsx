"use client";

import { Message } from "@prisma/client";
import { ChatForm } from "./ChatForm";
import { Output } from "./Output";
import { useOptimistic } from "react";
import { handleNewUserMsg } from "../(pages)/(homepage)/actions";
import { clearMessages, getHumanUser } from "@server";

interface ChatProps {
  messages: Message[];
}

type State = {
  optimisticMessages: Message[];
  pending: boolean;
};

export const Chat = ({ messages }: ChatProps) => {
  const initialState: State = {
    optimisticMessages: messages,
    pending: false,
  };

  const updateState = (state: State, newMessage: Message) => {
    return {
      optimisticMessages: [...state.optimisticMessages, newMessage],
      pending: true,
    };
  };

  const [state, optimisticallyUpdateMessages] = useOptimistic(
    initialState,
    updateState
  );

  const { optimisticMessages, pending } = state;

  const postUserMessage = async (formData: FormData) => {
    const humanUser = await getHumanUser();
    const userId = humanUser.id;
    const currentConversationId = humanUser.currentConversationId;

    const data = Object.fromEntries(formData.entries());
    const msg = data.msg.toString();

    if (!msg) return console.error("Message cannot be empty");

    if (!currentConversationId) return console.error("No conversation found");
    const newUserMessage = {
      id: -1,
      conversationId: currentConversationId,
      content: msg,
      userId,
    };

    optimisticallyUpdateMessages(newUserMessage);
    await handleNewUserMsg(msg);
  };

  const clearConversation = async () => {
    // await saveConversation();
    await clearMessages();
  };

  return (
    <>
      <Output messages={optimisticMessages} />
      <ChatForm
        disabled={pending}
        action={postUserMessage}
        secondaryAction={clearConversation}
      />
    </>
  );
};
