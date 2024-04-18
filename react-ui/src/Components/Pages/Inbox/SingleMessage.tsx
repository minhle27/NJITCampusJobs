import { useAuth } from "../../../hooks/useAuth";
import { BaseUser, Message } from "../../../types";
interface Props {
  own: boolean;
  message: Message;
  partner: BaseUser;
}

const SingleMessage = ({ own, message, partner }: Props) => {
  const userPic = useAuth().user?.profilePicture.fileUrl;
  const messageContainer = "flex flex-col mt-[20px]";
  const pic = "w-[36px] h-[36px] rounded-full object-cover mr-[10px]";
  const mypic = "order-2 w-[36px] h-[36px] rounded-full object-cover ml-[10px]";

  return (
    <section
      className={own ? messageContainer + " items-end" : messageContainer}
    >
      <div className="flex items-center">
        <img
          className={own ? mypic : pic}
          src={own ? `${userPic}` : `${partner?.profilePicture.fileUrl}`}
          alt="profilePicture"
        />
        <p
          className={
            "text-base p-[10px] rounded-md max-w-[500px] text-black " +
            (own ? "bg-blue-100" : "bg-orange-100")
          }
        >
          {message.content}
        </p>
      </div>
    </section>
  );
};

export default SingleMessage;
