import Feed from "../../Modules/Feed";
import { useGetAllPostsQuery } from "../../../services/apiSlice";
import { JobPost } from "../../../types";
import { useState } from "react";

interface FeedProps {
  searchValue: string;
  state: string;
}

const FeedList = ({ searchValue, state }: FeedProps) => {
  const [sortPost, setSortPost] = useState<JobPost[] | undefined>([]);
  const { data: posts, isSuccess } = useGetAllPostsQuery();

  console.log(posts);
  const bySearchField = (p: JobPost) =>
    p.title.toLowerCase().includes(searchValue.toLowerCase());

  const totalApplicants = (post: JobPost) => {
    const sum =
      post.applicants.accepted.length +
      post.applicants.pending.length +
      post.applicants.rejected.length;
    return sum;
  };
  const sortedHot = () => {
    const sortedPost = [...sortPost].sort(
      (a, b) => totalApplicants(a) - totalApplicants(b)
    );
    setSortPost([...sortedPost]);
  };

  const sortedLatest = () => {
    const sortedPost = [...sortPost].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
    setSortPost([...sortedPost]);
  };

  switch (state) {
    case "hot": {
      sortedHot();
      break;
    }

    case "latest": {
      sortedLatest();
      break;
    }

    case "saved": {
      break;
    }

    case "unapplied": {
      break;
    }
  }

  const postsToShow =
    searchValue && posts ? posts.filter(bySearchField) : posts;

  let content;
  if (isSuccess && postsToShow) {
    content = postsToShow.map((post) => <Feed key={post.id} post={post} />);
  } else {
    content = <div>Posts is not available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 grow overflow-y-auto w-3/4 max-w-[1060px] border mx-auto">
      {content}
    </div>
  );
};
export default FeedList;
