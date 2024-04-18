import { useNavigate } from "react-router-dom";
import { useGetEmployerPostsQuery } from "../../../services/apiSlice";
import { Spinner } from "../../Modules/Spinner";

interface JobsListProp {
  employerId: string;
}

const JobsListHead = ({ employerId }: JobsListProp) => {
  const navigate = useNavigate();
  const { data: posts, isSuccess } = useGetEmployerPostsQuery(employerId);
  const postsToShow = posts?.slice(0, Math.min(posts.length, 3));
  let content;
  if (isSuccess && postsToShow) {
    content = postsToShow.map((post) => <div key={post.id}>{post.title}</div>);
  } else {
    content = <Spinner />;
  }
  return (
    <div className="flex flex-col items-center grow overflow-y-auto">
      <div>{content}</div>
      <button onClick={() => navigate(`/dashboard/${employerId}`)}>
        Show all jobs
      </button>
    </div>
  );
};

export default JobsListHead;
