import { useParams } from "react-router-dom";
import { useGetEmployerPostsQuery } from "../../../services/apiSlice";
import Protected from "../../Modules/Protected";
import PostExcerpt from "./PostExcerpt";

interface JobsListProps {
  employerId: string;
}

const EmployerPostOptions = () => {
  const { id } = useParams();
  return (
    <Protected id={id!}>
      <section className="flex flex-col">
        <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700 mt-auto"></hr>
        <div className="flex justify-end items-center">
          <button className="btn-primary my-3 mx-3 bg-purple-400 hover:bg-purple-300">
            Edit Post
          </button>
          <button className="btn-primary my-3 mx-3 bg-lime-400 hover:bg-lime-300">
            Track Applicants
          </button>
        </div>
      </section>
    </Protected>
  );
};

const JobsList = ({ employerId }: JobsListProps) => {
  const { data: posts, isSuccess } = useGetEmployerPostsQuery(employerId);

  let content;
  if (isSuccess) {
    console.log(posts);
    content = posts.map((post) => (
      <PostExcerpt key={post.id} post={post}>
        <EmployerPostOptions />
      </PostExcerpt>
    ));
  } else {
    content = <div>Posts is not available</div>;
  }

  return (
    <div className="flex justify-center flex-col items-center grow overflow-y-auto">
      {content}
    </div>
  );
};

export default JobsList;
