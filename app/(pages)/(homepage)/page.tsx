import { getMessages } from "@server";
import { Chat } from "../../components/Chat";
import { convertToUIMessage } from "@utils";

const HomePage = async () => {
  const messages = await getMessages();
  const uiMessages = messages.map(convertToUIMessage);

  if (!uiMessages) return;

  return (
    <main>
      <Chat initialMessages={uiMessages} />
    </main>
  );
};

export default HomePage;
