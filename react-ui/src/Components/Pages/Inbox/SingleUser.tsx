import { Conversation } from "../../../types";
import { useGetUserByIdQuery } from "../../../services/apiSlice";

interface Props {
  conversation: Conversation;
  curUserId: string;
}

const SingleUser = ({ conversation, curUserId }: Props) => {
  const otherUserId = conversation.members.find((m) => m !== curUserId);
  const { data: user } = useGetUserByIdQuery(otherUserId!);

  return (
    <section className="flex w-full gap-3 items-center bg-stone-100 hover:bg-stone-200 rounded-md">
      <div className="m-2 w-[50px] h-[50px]">
        <img
          src={user?.profilePicture.fileUrl}
          alt="profile pic"
          className="object-cover w-[50px] h-[50px] rounded-full"
        />
      </div>
      <div className="font-medium">{user?.fullName}</div>
    </section>
  );
};

export default SingleUser;
