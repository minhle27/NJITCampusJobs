import Feed from "../../Modules/Feed";
import { useGetAllPostsQuery } from "../../../services/apiSlice";
import { JobPost } from "../../../types";

interface FeedProps {
  searchValue: string;
}

const FeedList = ({ searchValue }: FeedProps) => {
  const { data: posts, isSuccess } = useGetAllPostsQuery();
  console.log(posts);
  const bySearchField = (p: JobPost) =>
    p.title.toLowerCase().includes(searchValue.toLowerCase());

  const postsToShow =
    searchValue && posts ? posts.filter(bySearchField) : posts;

  let content;
  if (isSuccess && postsToShow) {
    content = postsToShow.map((post) => <Feed key={post.id} post={post} />);
  } else {
    content = <div>Posts is not available</div>;
  }

  return (
    <div className="flex items-center justify-evenly flex-wrap w-4/5 ">
      {content}
    </div>
  );
};
export default FeedList;
