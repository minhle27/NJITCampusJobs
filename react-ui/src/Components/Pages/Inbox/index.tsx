import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const Inbox = () => {
  return (
    <div className="flex justify-center mt-5 mx-4">
      <div className="flex h-[calc(100vh-120px)] w-[1200px] border-solid border-2 border-stone-300 rounded-lg">
        <div className="w-[23%]">
          <ChatList />
        </div>
        <div className="border-l-2 border-gray-200"></div>
        <div className="grow">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
