import { getCurrentConversation } from "@server";
import { Chat } from "@components";

import { convertToUIMessage } from "@utils";

const HomePage = async () => {
  const currentConversation = await getCurrentConversation();

  const uiMessages = currentConversation.map(convertToUIMessage);

  return (
    <main>
      <Chat initialMessages={uiMessages} />
    </main>
  );
};

export default HomePage;
