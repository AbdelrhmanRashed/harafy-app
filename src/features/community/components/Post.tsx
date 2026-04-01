import { Card, CardContent } from "@/components/ui/card";
import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  Bookmark,
  User
} from "lucide-react";
import { useState } from "react";

type PostType = {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
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
    <Card className="rounded-2xl bg-background border shadow-sm">
      <CardContent className="p-5 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/5 flex items-center justify-center">
              {post.user.avatar ? (
                <img
                  src={post.user.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-primary/60" />
              )}
            </div>

            {/* Info */}
            <div className="text-right">
              <p className="font-semibold text-sm">
                {post.user.name}
              </p>
              <p className="text-xs text-gray-400">
                {post.createdAt} 
              </p>
            </div>
          </div>

          {/* Actions */}
          <MoreHorizontal className="text-gray-400 cursor-pointer" size={18} />
        </div>

        {/* Content */}
        <p className="text-sm leading-6 text-gray-700 text-right">
          {post.content}
        </p>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div
            className={`grid gap-2 ${
              post.images.length === 1
                ? "grid-cols-1"
                : post.images.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 md:grid-cols-3"
            }`}
          >
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-48 object-cover rounded-xl"
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t text-sm">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-gray-500 hover:text-primary transition"
            >
              <MessageSquare size={16} />
              {post.comments}
            </button>

            {/* Like */}
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 transition ${
                liked ? "text-primary" : "text-gray-500"
              }`}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
              {likesCount}
            </button>

          </div>

          <button
            onClick={() => setSaved(!saved)}
            className={`transition ${
              saved ? "text-primary" : "text-gray-400"
            }`}
          >
            <Bookmark
              size={18}
              fill={saved ? "currentColor" : "none"}
            />
          </button>

        </div>

        {/* Comments */}
        {showComments && (
          <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 text-right">
            هنا التعليقات
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default Post;