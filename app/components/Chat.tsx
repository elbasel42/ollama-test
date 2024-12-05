"use client";

import { Message } from "@prisma/client";
import { ChatForm } from "./ChatForm";
import { Output } from "./Output";
import { useOptimistic } from "react";
import { handleNewUserMsg } from "../(pages)/(homepage)/actions";
import { SendHorizontal, Trash2 } from "lucide-react";
import { clearMessages } from "@server";

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
      optimisticMessages: [...messages, newMessage],
      pending: true,
    };
  };

  const [state, optimisticallyUpdateMessages] = useOptimistic(
    initialState,
    updateState
  );

  const { optimisticMessages, pending } = state;

  const postUserMessage = async (formData: FormData) => {
    // "use server";
    console.log(formData);
    const data = Object.fromEntries(formData.entries());
    const msg = data.msg.toString();
    if (!msg) return;
    const newUserMessage = { id: 0, content: msg, title: "", userId: -1 };
    optimisticallyUpdateMessages(newUserMessage);
    await handleNewUserMsg(msg);
  };
  const clearConversation = async () => {
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
