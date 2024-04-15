import { useGetConversationByUserQuery } from "../../../services/apiSlice";
import { useAuth } from "../../../hooks/useAuth";
import { Spinner } from "@chakra-ui/react";
import SingleUser from "./SingleUser";
import { Conversation } from "../../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  setConversation: React.Dispatch<
    React.SetStateAction<Conversation | undefined>
  >;
}
const ChatList = ({ setConversation }: Props) => {
  const userId = useAuth().user?.id;
  const navigate = useNavigate();
  const { data: conversations, isLoading } = useGetConversationByUserQuery(
    userId!
  );

  const openConversation = (conversation: Conversation) => {
    setConversation(conversation);
    navigate("/inbox/" + conversation.id);
  };

  let content;
  if (isLoading) {
    content = (
      <div className="mx-auto">
        <Spinner />
      </div>
    );
  } else if (conversations) {
    const conversationsToShow = conversations.filter((c) => c.messageCount > 0);
    content = conversationsToShow.map((conversation) => (
      <div
        key={conversation.id}
        className=""
        onClick={() => openConversation(conversation)}
      >
        <SingleUser conversation={conversation} curUserId={userId!} />
      </div>
    ));
  }

  return (
    <div className="flex flex-col p-2">
      <h3 className="text-center font-semibold text-lg p-2">Open Chats</h3>
      {content}
    </div>
  );
};

export default ChatList;
