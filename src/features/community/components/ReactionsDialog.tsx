// features/community/components/ReactionsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { getImageUrl } from '@/lib/utils';
import { getReactionEmoji, REACTIONS } from '../constants/reactions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getPostReactions } from '../api/getPostReactions';
import { getCommentReactions } from '../api/getCommentReactions';

interface ReactionsDialogProps {
  id: number;
  type: 'post' | 'comment';
  open: boolean;
  onClose: () => void;
}

const ReactionsDialog = ({ id, type, open, onClose }: ReactionsDialogProps) => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  const { data: reactions, isLoading } = useQuery({
    queryKey: [type === 'post' ? 'post-reactions' : 'comment-reactions', id],
    queryFn: () =>
      type === 'post' ? getPostReactions(id) : getCommentReactions(id),
    enabled: open,
  });

  const filtered = activeFilter
    ? reactions?.filter((r: any) => r.reactionType === activeFilter)
    : reactions;

  const counts = REACTIONS.map((r) => ({
    ...r,
    count:
      reactions?.filter((re: any) => re.reactionType === r.type).length ?? 0,
  })).filter((r) => r.count > 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">التفاعلات</DialogTitle>
        </DialogHeader>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 border-b pb-2">
          <button
            onClick={() => setActiveFilter(null)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-semibold transition',
              !activeFilter
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            الكل {reactions?.length ?? 0}
          </button>
          {counts.map((r) => (
            <button
              key={r.type}
              onClick={() => setActiveFilter(r.type)}
              className={cn(
                'flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition',
                activeFilter === r.type
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted',
              )}
            >
              <span>{r.emoji}</span>
              <span>{r.count}</span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="max-h-80 min-h-80 space-y-3 overflow-y-auto">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))
            : filtered?.map((reaction: any) => (
                <div
                  key={reaction.clientId}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={getImageUrl(reaction.clientPictureUrl)}
                      />
                      <AvatarFallback>{reaction.clientName[0]}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold">
                      {reaction.clientName}
                    </p>
                  </div>
                  <span className="text-xl">
                    {getReactionEmoji(reaction.reactionType)}
                  </span>
                </div>
              ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReactionsDialog;
