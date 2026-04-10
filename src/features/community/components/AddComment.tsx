import { useState, type KeyboardEvent } from 'react';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useAddComment } from '../hooks/useAddComment';
import { Loader2, Send, Smile } from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TextareaAutosize from 'react-textarea-autosize';
import EmojiContainer from './EmojiContainer';

const AddComment = ({ postId }: { postId: number }) => {
  // Comment State
  const [message, setMessage] = useState('');

  // Emoji Picker State
  const [showEmoji, setShowEmoji] = useState(false);
  // ref for emoji picker

  // Client Profile
  const { data: profile } = useClientProfile();

  // Add Comment Mutation
  const { mutate, isPending } = useAddComment(postId);

  // Submit Comment
  const handleSubmit = () => {
    if (!message.trim() || isPending) return;
    mutate(message, {
      onSuccess: () => setMessage(''),
    });
  };

  // Handle Enter Key
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-start gap-3 pt-4">
      {/* Avatar Section */}
      <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
        <Avatar>
          <AvatarImage src={getImageUrl(profile?.pictureUrl)} />
          <AvatarFallback className="text-primary text-xs font-bold">
            {profile?.firstName?.[0]}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Input Section */}
      <div className="relative flex min-w-0 flex-1 items-end">
        {/* textarea */}
        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب تعليقاً..."
          minRows={2}
          maxRows={10}
          disabled={isPending}
          className={cn(
            'w-full resize-none rounded-lg px-4 py-2.5 pe-20 text-sm',
            'bg-muted/50 dark:bg-muted border-2 border-transparent',
            'placeholder:text-muted-foreground',
            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
            'transition-all duration-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'custom-scrollbar overflow-y-auto',
          )}
        />

        <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
          {/* emoji */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowEmoji((prev) => !prev);
            }}
            className="text-primary hover:bg-primary/10 cursor-pointer rounded-full p-1.5 transition-all"
          >
            <Smile size={18} />
          </button>

          {/* send */}
          <button
            onClick={handleSubmit}
            disabled={isPending || !message.trim()}
            className="text-primary hover:bg-primary/10 cursor-pointer rounded-full p-1.5 transition-all disabled:opacity-30"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        <EmojiContainer
          showEmoji={showEmoji}
          setShowEmoji={setShowEmoji}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default AddComment;
