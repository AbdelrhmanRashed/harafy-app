import { Card, CardContent } from '@/components/ui/card';
import {
  MoreHorizontal,
  MessageSquare,
  Clock,
  MessageSquareText,
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
import { useReactToPost } from '../hooks/useReactToPost';
import EditPostDialog from './EditPostDialog';
import ReactionPicker from './ReactionPicker';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const Post = ({
  post,
  handleOpenRequest,
}: {
  post: PostType;
  handleOpenRequest: (providerId: number) => void;
}) => {
  // comments
  const [showComments, setShowComments] = useState(false);

  // edit post
  const [editPostOpen, setEditPostOpen] = useState(false);

  // lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // selected image
  const [selectedImage, setSelectedImage] = useState(0);

  const totalReactions = post.topReactions.reduce((sum, r) => sum + r.count, 0);

  // comment icon
  const Comment = showComments ? MessageSquareText : MessageSquare;

  // images
  const images = post.imageUrls.map((url) => ({
    src: getImageUrl(url) || '',
  }));

  // get current client id
  const currentClientId = getIdFromToken();

  // get user role
  const userRole = useAuthStore().user?.role;
  // delete post
  const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();
  // react to post
  const { mutate: reactToPost } = useReactToPost();

  return (
    <>
      <Card className="bg-card rounded-xl">
        <CardContent className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              {post.isProvider && post.clientId !== currentClientId ? (
                <Link
                  to={`${userRole?.includes('Provider') ? '/provider' : '/app'}/profile/${post.providerId}`}
                >
                  <Avatar
                    size="lg"
                    className="ring-primary ring-2 ring-offset-2"
                  >
                    <AvatarImage src={getImageUrl(post.clientPictureUrl)} />
                    <AvatarFallback>{post.clientName[0]}</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Avatar size="lg">
                  <AvatarImage src={getImageUrl(post.clientPictureUrl)} />
                  <AvatarFallback>{post.clientName[0]}</AvatarFallback>
                </Avatar>
              )}
              <div>
                {post.isProvider && post.clientId !== currentClientId ? (
                  <Link
                    to={`${userRole?.includes('Provider') ? '/provider' : '/app'}/profile/${post.providerId}`}
                  >
                    <p className="text-primary text-[16px] font-bold">
                      {post.clientName}
                    </p>
                  </Link>
                ) : (
                  <p className="text-[16px] font-bold">{post.clientName}</p>
                )}
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="size-3.5" />
                  {getTimeAgo(new Date(post.createdAt))}
                </p>
              </div>
            </div>
            {post.isProvider &&
              post.clientId !== currentClientId &&
              !userRole?.includes('Provider') && (
                <Button
                  variant="gradient"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() =>
                    post.providerId && handleOpenRequest(post.providerId)
                  }
                >
                  طلب خدمه
                </Button>
              )}
            {post.clientId === currentClientId && (
              <ActionsDropdown
                onEdit={() => setEditPostOpen(true)}
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
          <p className="text-sm font-bold wrap-break-word">{post.title}</p>
          {post.description && (
            <p className="text-sm leading-6 wrap-break-word">
              {post.description}
            </p>
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
                    className={`w-full cursor-pointer ${
                      images.length === 1
                        ? 'h-auto max-h-[580px] object-contain'
                        : 'h-full object-cover'
                    }`}
                    style={images.length === 1 ? { maxHeight: '400px' } : {}}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-2 text-sm">
            <div className="flex items-center gap-1">
              <ReactionPicker
                id={post.id}
                type="post"
                userReaction={post.userReaction}
                totalCount={totalReactions}
                topReactions={post.topReactions}
                onReact={(reactionType) =>
                  reactToPost({ postId: post.id, reactionType })
                }
              />

              {/* Comments */}
              <Button
                variant="ghost"
                onClick={() => setShowComments(!showComments)}
                className={cn(
                  'group flex h-9 items-center gap-1.5 rounded-lg px-3 transition-all duration-200',
                  'hover:bg-muted/60 hover:text-primary cursor-pointer',
                  showComments ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Comment size={18} className="transition-colors duration-200" />

                <span className="text-sm font-semibold">
                  {post.commentsCount}
                </span>
              </Button>
            </div>
          </div>

          {showComments && <CommentsSection postId={post.id} />}
        </CardContent>
      </Card>
      {/* edit post dialog */}
      <EditPostDialog
        post={post}
        open={editPostOpen}
        onClose={() => setEditPostOpen(false)}
      />
      {/* lightbox */}
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
