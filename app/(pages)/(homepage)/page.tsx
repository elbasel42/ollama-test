import { getMessages } from "@server";
import { Chat } from "../../components/Chat";

const HomePage = async () => {
  const messages = await getMessages();

  return (
    <main>
      <Chat messages={messages} />
    </main>
  );
};

export default HomePage;
