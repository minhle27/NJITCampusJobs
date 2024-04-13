import NewMessage from "./NewMessage";

const ChatBox = () => {
  return (
    <div className="flex flex-col h-full p-2">
      <h3 className="font-semibold text-lg p-2">Chatting with Minh</h3>
      <div className="grow overflow-y-auto overflow-x-hidden">
        
      </div>
      <div>
        <NewMessage />
      </div>
    </div>
  )
}

export default ChatBox;