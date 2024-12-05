interface ChatMessageProps {
  content: string;
}

export const ChatMessage = ({ content }: ChatMessageProps) => {
  return (
    <p className='px-2 py-2 text-white border border-white rounded-md'>
      {content}
    </p>
  );
};
