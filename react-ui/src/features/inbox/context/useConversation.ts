import { useContext } from 'react';

import { ConversationContext } from './ConversationContext';

export const useConversation = () => {
  return useContext(ConversationContext);
};