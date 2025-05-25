import { useUser } from '@/hooks/useUser';
import { useGetMessageByConversationQuery, useGetUserByIdQuery } from '@/services/apiSlice';

import { useConversation } from '../context/useConversation';
import NewMessage from './NewMessage';
import SingleMessage from './SingleMessage';


const ChatBox = () => {
  const curUserId = useUser().user!.id;
  const { activeConversationId, receiverId } = useConversation();
  
  const { data: messages = [], isLoading: isMessageLoading } = useGetMessageByConversationQuery(activeConversationId!);


  const { data: partner, isLoading: isPartnerLoading } = useGetUserByIdQuery(receiverId!);

  if (isMessageLoading || isPartnerLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col h-full p-2">
      <h3 className="font-semibold text-lg p-2">Chatting with {partner?.fullName}</h3>
      <div className="grow overflow-y-auto overflow-x-hidden flex flex-col pb-2">
        {messages.map(msg => {
          return (
            <div key={msg.id} className="">
              <SingleMessage message={msg} own={msg.sender === curUserId} partner={partner!} />
            </div>
          );
        })}
        {messages.length === 0 && <div className="text-center">No messages yet</div>}
      </div>
      <div>
        <NewMessage />
      </div>
    </div>
  );
};

export default ChatBox;
