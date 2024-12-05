"use client";
import { useState, useTransition, type KeyboardEvent } from "react";
import { LoaderCircle, SendHorizontal, Trash2 } from "lucide-react";
// import { handleNewUserMsg } from "../(pages)/(homepage)/actions";
// import { type FormEvent, useState } from "react";
//
interface ChatFormProps {
  action: (formData: FormData) => Promise<void>;
  secondaryAction: (formData: FormData) => Promise<void>;
  disabled?: boolean;
}
export const ChatForm = ({
  action,
  secondaryAction,
  disabled,
}: ChatFormProps) => {
  const [userMsg, setUserMsg] = useState("");
  const [isPending, startTransition] = useTransition();
  // action={handleNewUserMsg}
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.cufalserrentTarget);
  //   onSubmit(formData);
  //   // handleNewUserMsg(formData);
  // };
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    console.log(e.key, e.ctrlKey, e.metaKey);
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      // e.preventDefault();
      const formData = new FormData();
      formData.append("msg", userMsg);
      startTransition(() => action(formData));
      setUserMsg("");
    }
  };

  return (
    <form
      onKeyDown={handleKeyDown}
      action={action}
      className='flex gap-2 items-center justify-center flex-1 px-2 py-2'
    >
      <textarea
        disabled={disabled}
        value={userMsg}
        onChange={(e) => {
          setUserMsg(e.target.value);
        }}
        name='msg'
        className='bg-black disabled:cursor-not-allowed disabled:text-gray-500 flex-1 text-white border-white border rounded-md px-2 py-1 '
      />
      <div className='space-x-4'>
        <button type='submit'>
          {isPending ? (
            <LoaderCircle className='animate-spin' size={24} />
          ) : (
            <SendHorizontal size={24} />
          )}
        </button>
        <button formAction={secondaryAction}>
          <Trash2 size={24} />
        </button>
      </div>
    </form>
  );
};
