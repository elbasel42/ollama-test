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
      className='fixed items-center bottom-0 flex bg-black/80 w-full gap-2 px-4 py-2 rounded-t-3xl'
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
      <Button>
        {isPending && <LoaderCircle size={24} className='animate-spin' />}
        {!isPending && <SendHorizontal size={24} />}
      </Button>
      <Button formAction={secondaryAction}>
        <Trash2 size={24} />
      </Button>
    </form>
  );
};
