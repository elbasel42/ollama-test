"use client";

import { ChatMessage } from "@components";
import { Message } from "ai";
import { useEffect, useRef } from "react";

interface OutputProps {
  messages: Message[];
}

export const Output = ({ messages }: OutputProps) => {
  const ref = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    current.scrollTo({
      top: current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  console.log({ message: messages[-1] });
  return (
    <output ref={ref} className='space-y-4 block mb-[20vh]'>
      {messages.map(({ id, content }) => {
        if (!content) return null;
        return <ChatMessage key={id} content={content} />;
      })}
    </output>
  );
};
