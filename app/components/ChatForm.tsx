"use client";

import { useEffect, useState, useTransition, type KeyboardEvent } from "react";
import { LoaderCircle, SendHorizontal, Trash2 } from "lucide-react";
import { Button } from "@ui";
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

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const isCtrlKey = e.ctrlKey;
    const isEnterKey = e.key === "Enter";

    if (isCtrlKey && isEnterKey) {
      const formData = new FormData();
      formData.append("msg", userMsg);
      startTransition(() => action(formData));
    }
  };

  useEffect(() => {
    if (!isPending) {
      setUserMsg("");
    }
  }, [isPending]);

  return (
    <form
      onKeyDown={handleKeyDown}
      action={action}
      className='flex gap-2 items-center justify-center px-2 py-2'
    >
      <textarea
        rows={2}
        disabled={disabled}
        value={userMsg}
        onChange={(e) => {
          setUserMsg(e.target.value);
        }}
        name='msg'
        className='text-xl bg-black disabled:cursor-not-allowed disabled:text-gray-500 flex-1 text-white border-white border rounded-md px-2 py-1 '
      />
      <div className='space-x-4'>
        <Button>
          {isPending && <LoaderCircle size={24} className='animate-spin' />}
          {!isPending && <SendHorizontal size={24} />}
        </Button>
        <Button formAction={secondaryAction}>
          <Trash2 size={24} />
        </Button>
      </div>
    </form>
  );
};
