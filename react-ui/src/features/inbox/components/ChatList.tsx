import type { Conversation } from '@/types';

import { useNavigate } from 'react-router-dom';

import { useUser } from '@/hooks/useUser';
import { useGetConversationByUserQuery } from '@/services/apiSlice';

import { useConversation } from '../context/useConversation';
import SingleUser from './SingleUser';

const ChatList = () => {
  const userId = useUser().user?.id;
  const navigate = useNavigate();

  const { setActiveConversationId, activeConversationId, setReceiverId } = useConversation();

  const { data: conversations, isLoading } = useGetConversationByUserQuery(userId!);

  const openConversation = (conversation: Conversation) => {
    setActiveConversationId(conversation.id);
    setReceiverId(conversation.members.find((member) => member !== userId) || null);
    navigate('/inbox/' + conversation.id);
  };

  let content;

  if (isLoading) {
    content = <div className="mx-auto">Loading</div>;
  } else if (conversations) {
    const conversationsToShow = conversations.filter((c) => c.messageCount > 0 || c.id === activeConversationId);

    content = conversationsToShow.map(conversation => (
      <div key={conversation.id} className="mb-3" onClick={() => openConversation(conversation)}>
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
