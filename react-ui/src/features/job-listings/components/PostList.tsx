import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import PaginationWrapper from '@/components/ui/custom/Pagination';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useGetAllPostsQuery } from '../../../services/apiSlice';
import PostCard from './PostCard';

const PostList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);
  const [page, setPage] = useState(initialPage);
  const { data: posts, isLoading, isSuccess } = useGetAllPostsQuery({ page, limit: 24 });

  let content;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading</div>;
  }

  if (isSuccess && posts.data.length > 0) {
    content = posts.data.map(post => <PostCard key={post.id} post={post} />);
  } else {
    content = <div>Posts is not available</div>;

    return <div>{content}</div>;
  }

  return (
    <div className="max-w-[1260px] mx-auto p-1">
      <h1 className="text-2xl font-bold mb-4">New Jobs on NCJ</h1>
      <ScrollArea className="rounded-lg border p-4 mb-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[calc(100vh-300px)] lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {content}
        </div>
      </ScrollArea>
      <PaginationWrapper totalPages={posts.totalPages} currentPage={page} setCurrentPage={setPage} baseRoute="/jobs" type='numberList' />
    </div>
  );
};

export default PostList;
