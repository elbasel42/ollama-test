"use client";

import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
  // useEffect,
  // useState,
  type KeyboardEvent,
} from "react";
import { LoaderCircle, SendHorizontal, Trash2 } from "lucide-react";
import { Button } from "@ui";
import type { ChatRequestOptions, CreateMessage, Message } from "ai";
import { createMessage, getHumanUser } from "@server";
import { convertToPrismaMessage } from "@utils";
interface ChatFormProps {
  // handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  // handleSubmit: (
  //   event?: {
  //     preventDefault?: () => void;
  //   },
  //   chatRequestOptions?: ChatRequestOptions
  // ) => void;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  stop: () => void;
  onSecondaryButtonClick?: () => void;
  isLoading?: boolean;
}

export const ChatForm = ({
  // handleChange,
  // handleSubmit,
  isLoading,
  append,
  onSecondaryButtonClick,
  stop,
  ...props
}: ChatFormProps) => {
  const [userMsg, setUserMsg] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const postUserMessage = async () => {
    if (!userMsg) return;
    append({ content: userMsg, role: "user" });
    setUserMsg("");
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserMsg(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postUserMessage();
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLFormElement>) => {
    const isCtrlKey = e.ctrlKey;
    const isEnterKey = e.key === "Enter";

    if (isCtrlKey && isEnterKey) {
      postUserMessage();
      setUserMsg("");
    }
  };

  const onPrimaryButtonClick = () => {
    if (isLoading) return stop();
    postUserMessage();
  };

  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      className='fixed items-center bottom-0 flex bg-black/80 w-full gap-2 px-4 py-2 rounded-t-3xl'
      {...props}
    >
      <textarea
        ref={textAreaRef}
        autoFocus
        value={userMsg}
        onChange={onChange}
        disabled={isLoading}
        rows={2}
        name='msg'
        className='text-xl bg-black disabled:cursor-not-allowed disabled:text-gray-500 flex-1 text-white border-white border rounded-md px-2 py-1 '
      />
      <Button type='button' onClick={onPrimaryButtonClick}>
        {isLoading && <LoaderCircle size={24} className='animate-spin' />}
        {!isLoading && <SendHorizontal size={24} />}
      </Button>
      <Button onClick={onSecondaryButtonClick}>
        <Trash2 size={24} />
      </Button>
    </form>
  );
};
