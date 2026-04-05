import { Card, CardContent } from '@/components/ui/card';
import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  Bookmark,
  User,
} from 'lucide-react';
import { useState } from 'react';

type PostType = {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  role: string;
  content: string;
  subject: string;
  images?: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
  createdAt: string;
};

const Post = ({ post }: { post: PostType }) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Card className="bg-card rounded-2xl border-0">
      <CardContent className="space-y-4 p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
              {post.user.avatar ? (
                <img
                  src={post.user.avatar}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="text-primary/60 h-6 w-6" />
              )}
            </div>

            {/* Info */}
            <div className="">
              <p className="text-sm font-semibold">{post.user.name}</p>
              <p className="text-xs text-gray-500">
                {post.role} • {post.createdAt}
              </p>
            </div>
          </div>

          <MoreHorizontal className="cursor-pointer text-gray-400" size={18} />
        </div>
        <p className="text-sm font-bold">{post.subject}</p>
        <p className="text-sm leading-6">{post.content}</p>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div
            className={`grid gap-2 ${
              post.images.length === 1
                ? 'grid-cols-1'
                : post.images.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-2 md:grid-cols-3'
            }`}
          >
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-48 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-2 text-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:text-primary flex items-center gap-1 text-gray-500 transition"
            >
              <MessageSquare size={16} />
              {post.comments}
            </button>

            {/* Like */}
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 transition ${
                liked ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              {likesCount}
            </button>
          </div>

          <button
            onClick={() => setSaved(!saved)}
            className={`transition ${saved ? 'text-primary' : 'text-gray-400'}`}
          >
            <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="rounded-xl bg-gray-50 p-3 text-right text-sm text-gray-600">
            هنا التعليقات
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
