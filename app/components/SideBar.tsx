"use client";

import { setCurrentConversationId } from "@server";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SidBarProps {
  conversations: { id: string; createdAt: Date }[];
}
export const SideBar = ({ conversations }: SidBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  if (conversations.length === 0) return null;
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='fixed inset-0 z-10 w-10 h-10 bg-blue-500 rounded-full mt-4 ml-4'
      ></button>
      <div
        className={twMerge(
          "fixed flex flex-col gap-4 transition-transform h-screen w-max inset-0 bg-slate-900 py-2 px-4 transform -translate-x-full",
          isOpen && "translate-x-0"
        )}
      >
        {conversations.map(({ id }) => {
          return (
            <button
              onClick={() => {
                setCurrentConversationId(id);
                setIsOpen(false);
              }}
              key={id}
            >
              {id}
            </button>
          );
        })}
      </div>
    </>
  );
};
