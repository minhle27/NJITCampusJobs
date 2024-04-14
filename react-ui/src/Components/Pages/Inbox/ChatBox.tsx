import NewMessage from "./NewMessage";
import {
  useGetMessageByConversationQuery,
  useGetUserByIdQuery,
} from "../../../services/apiSlice";
import { Conversation } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import SingleMessage from "./SingleMessage";
import { Spinner } from "@chakra-ui/react";

interface Props {
  conversation: Conversation;
}

const ChatBox = ({ conversation }: Props) => {
  const curUserId = useAuth().user!.id;
  const { data: messages = [], isLoading: isMessageLoading } =
    useGetMessageByConversationQuery(conversation.id);
  const otherUserId = conversation.members.find((m) => m !== curUserId);
  const { data: partner, isLoading: isPartnerLoading } = useGetUserByIdQuery(
    otherUserId!
  );

  if (isMessageLoading || isPartnerLoading) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col h-full p-2">
      <h3 className="font-semibold text-lg p-2">
        Chatting with {partner?.fullName}
      </h3>
      <div className="grow overflow-y-auto overflow-x-hidden flex flex-col pb-2">
        {messages.map((msg) => {
          return (
            <div className="msg-container">
              <SingleMessage
                message={msg}
                own={msg.sender === curUserId}
                partner={partner!}
              />
            </div>
          );
        })}
      </div>
      <div>
        <NewMessage />
      </div>
    </div>
  );
};

export default ChatBox;
