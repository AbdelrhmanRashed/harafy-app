import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl, getTimeAgo } from '@/lib/utils';
import { Clock, Ellipsis, Loader2, Smile, SquarePen } from 'lucide-react';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { getIdFromToken } from '@/lib/auth/getIdFromToken';
import TextareaAutosize from 'react-textarea-autosize';
import ActionsDropdown from './ActionsDropdown';
import { Button } from '@/components/ui/button';
import { useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import type { CommentResponse } from '../types/comment.type';
import { useUpdateComment } from '../hooks/useUpdateComment';
import EmojiContainer from './EmojiContainer';
import { useReactToComment } from '../hooks/useReactToComment';
import ReactionPicker from './ReactionPicker';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const Comment = ({ comment }: { comment: CommentResponse }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(comment.message);
  const [showEmoji, setShowEmoji] = useState(false);

  const currentClientId = getIdFromToken();
  const timeAgo = getTimeAgo(new Date(comment.createdAt));

  const { mutate: deleteComment, isPending: isDeletingComment } =
    useDeleteComment(comment.postId);

  const { mutate: updateComment, isPending: isUpdatingComment } =
    useUpdateComment(comment.postId);

  const { mutate: reactToComment } = useReactToComment(comment.postId);

  const totalReactions = comment.reactions.reduce((sum, r) => sum + r.count, 0);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdateComment();
    }
  };

  const userRole = useAuthStore().user?.role;

  const handleUpdateComment = () => {
    updateComment(
      { commentId: comment.id, Message: message },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  return (
    <div className="flex min-w-0 gap-2">
      <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        {comment.isProvider ? (
          <Link
            to={`${userRole?.includes('Provider') ? '/provider' : '/app'}/profile/${comment.providerId}`}
          >
            <Avatar className="ring-primary h-8 w-8 ring-2 ring-offset-2">
              <AvatarImage src={getImageUrl(comment.clientPictureUrl)} />
              <AvatarFallback>{comment.clientName[0]}</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Avatar>
            <AvatarImage src={getImageUrl(comment.clientPictureUrl)} />
            <AvatarFallback>{comment.clientName[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className="group flex max-w-full flex-1 items-start gap-2">
        <div
          className={cn(
            'flex max-w-[95%] min-w-0 flex-col',
            isEditing ? 'flex-1' : 'w-fit',
          )}
        >
          <div
            className={cn(
              'bg-muted space-y-1 rounded-xl px-3 py-2 wrap-break-word',
              isEditing ? 'w-full' : 'w-fit min-w-[250px]',
              isEditing && 'border-primary border-2',
            )}
          >
            {comment.isProvider ? (
              <Link
                to={`${userRole?.includes('Provider') ? '/provider' : '/app'}/profile/${comment.providerId}`}
              >
                <p className="text-primary mb-1 cursor-pointer text-sm font-semibold">
                  {comment.clientName}
                </p>
              </Link>
            ) : (
              <p className="text-sm font-semibold">{comment.clientName}</p>
            )}

            {isEditing ? (
              <div className="relative flex w-full flex-col gap-4">
                <div className="relative">
                  {showEmoji && (
                    <div className="absolute bottom-0 left-0 z-999999 mb-2">
                      <EmojiContainer
                        showEmoji={showEmoji}
                        setShowEmoji={setShowEmoji}
                        setMessage={setMessage}
                      />
                    </div>
                  )}
                  <Button
                    variant="link"
                    size="sm"
                    className="absolute bottom-0 left-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEmoji((prev) => !prev);
                    }}
                  >
                    <Smile className="size-4" />
                  </Button>
                  <TextareaAutosize
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتب تعليقاً..."
                    minRows={2}
                    maxRows={10}
                    disabled={isUpdatingComment}
                    dir="rtl"
                    className={cn(
                      'border-input bg-background ring-offset-background flex w-full resize-none rounded-md border px-4 py-3 text-sm wrap-break-word transition-all duration-200',
                      'placeholder:text-muted-foreground/60 leading-relaxed',
                      'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      'pl-10',
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setIsEditing(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="px-4"
                    disabled={isUpdatingComment}
                    onClick={handleUpdateComment}
                  >
                    {isUpdatingComment ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <SquarePen className="size-4" />
                        حفظ
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-5 [word-break:break-word] whitespace-pre-wrap">
                {comment.message}
              </p>
            )}
          </div>

          {/* Reactions */}
          <div className="mt-1 flex items-center gap-1">
            {/* Time */}
            <p className="text-muted-foreground flex items-center gap-1 px-2 text-xs">
              <Clock className="size-3" />
              <span>{timeAgo}</span>
            </p>

            {/* ✅ ReactionPicker */}
            <ReactionPicker
              id={comment.id}
              type="comment"
              userReaction={comment.userReaction}
              totalCount={totalReactions}
              topReactions={comment.reactions}
              onReact={(reactionType) =>
                reactToComment({ commentId: comment.id, reactionType })
              }
            />
          </div>
        </div>

        {currentClientId === comment.clientId && (
          <div className="self-center">
            <ActionsDropdown
              onDelete={() => deleteComment(comment.id)}
              isDeleting={isDeletingComment}
              open={open}
              setOpen={setOpen}
              onEdit={() => setIsEditing(true)}
            >
              <Button
                variant="link"
                size="sm"
                className={cn(
                  'text-muted-foreground h-8 w-8 cursor-pointer p-0 transition-all duration-200',
                  'md:pointer-events-none md:opacity-0',
                  'md:group-hover:pointer-events-auto md:group-hover:opacity-100',
                  open && 'pointer-events-auto! opacity-100!',
                )}
              >
                <Ellipsis className="h-4 w-4" />
              </Button>
            </ActionsDropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
