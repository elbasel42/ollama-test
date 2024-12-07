interface ChatMessageProps {
  content: string;
  userId: number;
}

export const ChatMessage = ({ content, userId }: ChatMessageProps) => {
  console.log({ userId, content });
  if (userId === -1) {
    return <span>{content}</span>;
  }

  return (
    <p className='px-2 py-2 text-white border border-white rounded-md'>
      {content}
    </p>
  );
};
