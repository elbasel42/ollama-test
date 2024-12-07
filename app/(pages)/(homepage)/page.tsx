import { getCurrentConversation } from "@server";
import { Chat } from "../../components/Chat";
import { convertToUIMessage } from "@utils";

const HomePage = async () => {
  // const humanUser = await getHumanUser();
  // if (!humanUser) {
  //   createUser({ name: "Human" });
  // }

  // const currentConversationId = humanUser?.currentConversationId;

  const currentConversation = await getCurrentConversation();
  // currentConversationId ?? ""

  const uiMessages = currentConversation.map(convertToUIMessage);

  return (
    <main>
      <Chat initialMessages={uiMessages} />
    </main>
  );
};

export default HomePage;
