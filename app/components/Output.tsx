"use client";

import { ChatMessage } from "@components";
import type { Message } from "@prisma/client";
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

  return (
    <>
      <output
        ref={ref}
        className='space-y-4 h-[80vh] overflow-auto app-scrollbar px-4'
      >
        {messages.map(({ id, content }) => {
          if (!content) return null;
          return <ChatMessage key={id} content={content} />;
        })}
      </output>
    </>
  );
};
