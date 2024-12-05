import { getMessages } from "@server";
import { Chat } from "../../components/Chat";

const HomePage = async () => {
  const messages = await getMessages();

  return (
    <main className='min-h-screen py-4 px-2 flex flex-col'>
      <Chat messages={messages} />
    </main>
  );
};

export default HomePage;
