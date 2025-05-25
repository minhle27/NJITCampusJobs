import type { JobPost } from '@/types';

import { BookmarkIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { formatDate } from '@/utils';

import { useGetEmployerQuery } from '../../../services/apiSlice';

interface PostCardProps {
  post: JobPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUser();
  const { data: employer, isLoading: isLoadingEmployer } = useGetEmployerQuery(post.employer);

  if (isLoadingEmployer) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-11 h-11">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link to={`/employers/${employer!.id}`} className="hover:underline">
                <p className="text-gray-800 font-semibold">{employer?.fullName}</p>
              </Link>
              <p className="text-gray-500 text-sm">{employer?.department}</p>
            </div>
          </div>
          {user?.accountType === 'student' && (
            <Button variant="ghost" size="icon">
              <BookmarkIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>
          {post.externalApplication ? (
            <Badge className="bg-gray-400 mb-1">Apply Externally</Badge>
          ) : (
            <Badge className="bg-emerald-400 mb-1">Easy Apply</Badge>
          )}
          <Link to={`/jobs/${post.id}`} className="hover:underline">
            <h4 className="scroll-m-20 text-lg font-bold tracking-tight text-gray-900">{post?.title}</h4>
          </Link>
        </CardTitle>
        <div className="flex space-x-2">
          <p className="text-sm text-gray-500">{post?.salary}/hr</p>
          <span className="text-sm text-gray-500">·</span>
          <p className="text-sm text-gray-500">{formatDate(post.updatedAt)}</p>
          <span className="text-sm text-gray-500">·</span>
          <p className="text-sm text-gray-500">{post.location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
