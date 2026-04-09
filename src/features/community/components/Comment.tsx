import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl, getTimeAgo } from '@/lib/utils';
import { Clock, Ellipsis } from 'lucide-react';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { getIdFromToken } from '@/lib/auth/getIdFromToken';

import ActionsDropdown from './ActionsDropdown';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const Comment = ({ comment }: { comment: any }) => {
  const { mutate: deleteComment, isPending: isDeletingComment } =
    useDeleteComment(comment.postId);
  const currentClientId = getIdFromToken();
  const [open, setOpen] = useState(false);

  const timeAgo = getTimeAgo(new Date(comment.createdAt));

  return (
    <div className="flex min-w-0 gap-2">
      <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
        <Avatar>
          <AvatarImage src={getImageUrl(comment.clientPictureUrl)} />
          <AvatarFallback>{comment.clientName[0]}</AvatarFallback>
        </Avatar>
      </div>

      <div className="group flex max-w-full items-start gap-2">
        <div className="flex max-w-[95%] min-w-0 flex-col">
          <div className="bg-muted w-fit min-w-[250px] overflow-hidden rounded-xl px-3 py-2 wrap-break-word">
            <p className="text-md truncate font-bold">{comment.clientName}</p>

            <p className="text-sm leading-5 [word-break:break-word] whitespace-pre-wrap">
              {comment.message}
            </p>
          </div>

          <p className="text-muted-foreground mt-1 flex items-center gap-1 px-1 text-xs">
            <Clock className="size-3" />
            <span>{timeAgo}</span>
          </p>
        </div>

        {currentClientId === comment.clientId && (
          <div className="self-center">
            <ActionsDropdown
              onDelete={() => deleteComment(comment.id)}
              isDeleting={isDeletingComment}
              open={open}
              setOpen={setOpen}
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
