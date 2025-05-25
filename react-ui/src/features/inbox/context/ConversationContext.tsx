import type { ReactNode } from 'react';

import { createContext, useState } from 'react';

export interface ConversationContextType {
  activeConversationId: string | null;
  setActiveConversationId: (conversationId: string | null) => void;
  receiverId: string | null;
  setReceiverId: (receiverId: string | null) => void;
}

export const ConversationContext = createContext<ConversationContextType>({
  activeConversationId: null,
  setActiveConversationId: () => {},
  receiverId: null,
  setReceiverId: () => {},
});

export const ConversationContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);

  return (
    <ConversationContext.Provider
      value={{
        receiverId,
        setReceiverId,
        activeConversationId,
        setActiveConversationId
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

