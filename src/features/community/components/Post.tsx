import { Card, CardContent } from '@/components/ui/card';
import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  Bookmark,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import type { PostType } from '../types/post.type';
import { cn, getImageUrl, getTimeAgo } from '@/lib/utils';
import CommentsSection from './CommentsSection';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ActionsDropdown from './ActionsDropdown';
import { useDeletePost } from '../hooks/useDeletePost';
import { getIdFromToken } from '@/lib/auth/getIdFromToken';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Download from 'yet-another-react-lightbox/plugins/download';
const Post = ({ post }: { post: PostType }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.topReactions.length);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false);

  const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();
  const currentClientId = getIdFromToken();

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const images = post.imageUrls.map((url) => ({
    src: getImageUrl(url),
  }));

  return (
    <>
      <Card className="bg-card rounded-xl">
        <CardContent className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Avatar size="lg">
                <AvatarImage src={getImageUrl(post.clientPictureUrl)} />
                <AvatarFallback>{post.clientName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[16px] font-bold">{post.clientName}</p>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="size-3.5" />
                  {getTimeAgo(new Date(post.createdAt))}
                </p>
              </div>
            </div>
            {post.clientId === currentClientId && (
              <ActionsDropdown
                onDelete={() => deletePost(post.id)}
                isDeleting={isDeletingPost}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground h-8 w-8 cursor-pointer p-0"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </ActionsDropdown>
            )}
          </div>

          {/* Title & Description */}
          <p className="text-sm font-bold">{post.title}</p>
          {post.description && (
            <p className="text-sm leading-6">{post.description}</p>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div
              className={`mt-3 grid gap-2 ${
                images.length === 1
                  ? 'grid-cols-1'
                  : images.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-2 md:grid-cols-3'
              }`}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`border-border/50 bg-muted/20 relative overflow-hidden rounded-xl border ${
                    images.length === 1 ? 'h-auto w-full' : 'aspect-square'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={`Post image ${i + 1}`}
                    onClick={() => {
                      setSelectedImage(i);
                      setLightboxOpen(true);
                    }}
                    className={`w-full cursor-pointer transition-transform duration-300 hover:scale-105 ${
                      images.length === 1
                        ? 'h-auto object-contain'
                        : 'h-full object-cover'
                    }`}
                    style={images.length === 1 ? { maxHeight: '600px' } : {}}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-2 text-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1 transition ${liked ? 'text-primary' : 'text-gray-500'}`}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                {likesCount}
              </button>
              <Button
                variant={'ghost'}
                onClick={() => setShowComments(!showComments)}
                className={cn(
                  'hover:text-primary flex cursor-pointer items-center gap-1 text-gray-500 transition hover:bg-transparent',
                  showComments && 'text-primary',
                )}
              >
                <MessageSquare />
                {post.commentsCount}
              </Button>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              className={`transition ${saved ? 'text-primary' : 'text-gray-400'}`}
            >
              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {showComments && <CommentsSection postId={post.id} />}
        </CardContent>
      </Card>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images}
        index={selectedImage}
        plugins={[Zoom, Thumbnails, Download]}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: images.length <= 1 }}
        animation={{ fade: 300 }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          wheelZoomDistanceFactor: 100,
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
          },
          slide: {
            padding: '40px',
          },
        }}
      />
    </>
  );
};

export default Post;
