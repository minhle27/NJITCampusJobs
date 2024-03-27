import { useGetEmployerQuery } from "../../../services/apiSlice";
import { JobPost } from "../../../types";

interface PostExcerptProps {
  post: JobPost;
  children: JSX.Element;
}

const PostExcerpt = ({ post, children }: PostExcerptProps) => {
  const { data: employer } = useGetEmployerQuery(post.employer);
  // console.log(employer);
  return (
    <div className="flex flex-col shadow-lg mx-5 my-3 rounded-md w-1/2 h-fit bg-gray-100 shadow-slate-300">
      <div className="flex">
        <section className="w-[15%] h-auto flex items-center mx-3 mt-4 mb-5">
          <img
            src={employer?.profilePicture.fileUrl}
            className="rounded-lg h-full w-5/12 grow"
            alt="profilePicture"
          />
        </section>
        <section className="flex flex-col my-3">
          <h1 className="font-bold text-2xl text-gray-900">
            Title: {post.title}
          </h1>
          <div className="font-semibold text-slate-600">
            <p>Location: {post.location}</p>
            <p>Department: {employer?.department}</p>
            <p>Salary per hour: {post.salary}</p>
          </div>
        </section>
      </div>
      {children}
    </div>
  );
};

export default PostExcerpt;
