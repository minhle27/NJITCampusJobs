import { useGetEmployerQuery } from "../../services/apiSlice";
import save from "../../assets/feed-save-logo.svg";
import { JobPost } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  post: JobPost;
}

const Feed = ({ post }: Props) => {
  const navigate = useNavigate();
  let employerId;

  if (typeof post.employer === "string") {
    employerId = post.employer;
  } else {
    employerId = post.employer.id;
  }

  const { data: employer } = useGetEmployerQuery(employerId);
  return (
    <div
      className="min-w-[300px] flex flex-col shadow-lg rounded-md p-6 bg-gray-100 shadow-slate-300 transition ease-in-out hover:scale-105 hover:bg-gray-300 font-montserat m-3 justify-between cursor-default"
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="bg-cyan-feed rounded-lg text-14 w-fit px-1 py-0.5 font-semibold">
              {post.externalApplication ? "apply externally" : "1-click apply"}
            </div>
          </div>
          <img src={save} className="aspect-square w-[40x]" />
        </div>
        <div>
          <div className="font-bold text-[20px] grow">{post?.title}</div>
          <div className="text-15 py-1">Location: {post?.location}</div>
          <div className="text-15 py-1">Department: {employer?.department}</div>
        </div>
      </div>
      <section className="flex flex-col">
        <div
          className="flex text-16 font-semibold py-1 items-center"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/employer/${employerId}`);
          }}
        >
          <img
            src={employer?.profilePicture.fileUrl}
            className="mr-3 aspect-square max-w-11 rounded-full cursor-pointer"
          />
          <div className="cursor-pointer">{employer?.fullName}</div>
        </div>
      </section>
    </div>
  );
};

export default Feed;
