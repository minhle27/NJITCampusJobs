import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useSendNewMessageMutation } from "../../../services/apiSlice";
import { getErrorMessage } from "../../../utils";
import { useToast } from "@chakra-ui/react";

const NewMessage = () => {
  const [value, setValue] = useState("");
  const user = useAuth().user;
  const { id } = useParams();
  const [sendNewMessage, { isLoading, error }] = useSendNewMessageMutation();
  const toast = useToast();

  const handleSubmit = async () => {
    const message = {
      sender: user!.id,
      content: value,
      conversation: id,
    };
    if (value.length !== 0) {
      // const receiverId = partner?._id;
      // socket.current.emit("sendMessage", {
      //   senderId: user._id,
      //   receiverId,
      //   text: newMsg,
      // });
      if (!isLoading) {
        try {
          await sendNewMessage(message);
        } catch (err) {
          console.error("Failed to create new job: ", err);
          const errorMessage =
            error && "data" in error
              ? JSON.stringify(error.data)
              : JSON.stringify(getErrorMessage(err));
          toast({
            status: "error",
            title: "Error",
            description: errorMessage,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Message"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className=" bg-neutral-200 outline-none grow m-1 pl-2 rounded-md"
      />
      <button
        type="submit"
        className="btn-2"
        value="Send"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default NewMessage;
