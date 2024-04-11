import { useGetEmployerQuery } from "../../services/apiSlice";
import save from "../../assets/feed-save-logo.svg";
import { JobPost } from "../../types";

interface Props {
  post: JobPost;
}

const Feed = ({ post }: Props) => {
  let employerId;

  if (typeof post.employer === "string") {
    employerId = post.employer;
  } else {
    employerId = post.employer.id;
  }

  const { data: employer } = useGetEmployerQuery(employerId);
  return (
    <div className="shadow-lg rounded-md h-[290px] min-w-[300px] max-w-[500px] p-6 bg-gray-100 shadow-slate-300 transition ease-in-out hover:scale-105 hover:bg-gray-300 font-montserat relative m-3">
      <div className="flex-col flex w-full">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="bg-cyan-feed rounded-lg text-14 w-fit px-1 py-0.5 font-semibold">
              {post.externalApplication ? "apply externally" : "1-click apply"}
            </div>
          </div>
          <img src={save} className="aspect-square w-[40x]" />
        </div>
        <div className="font-bold text-[20px] py-5">{post?.title}</div>
        <section className="bottom-3 absolute">
          <div className="text-15 py-1">Location: {post?.location}</div>
          <div className="text-15 py-1">Department: {employer?.department}</div>
          <div className="flex text-16 font-semibold py-1 items-center">
            <img
              src={employer?.profilePicture.fileUrl}
              className="mr-3 aspect-square max-w-11 rounded-full"
            />
            {employer?.fullName}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Feed;
