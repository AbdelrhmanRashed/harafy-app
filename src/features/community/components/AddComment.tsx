import { useState, type KeyboardEvent } from 'react';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useAddComment } from '../hooks/useAddComment';
import { Loader2, Send } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

import TextareaAutosize from 'react-textarea-autosize';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AddComment = ({ postId }: { postId: number }) => {
  const [message, setMessage] = useState('');
  const { data: profile } = useClientProfile();
  const { mutate, isPending } = useAddComment(postId);

  const handleSubmit = () => {
    if (!message.trim() || isPending) return;
    mutate(message, {
      onSuccess: () => setMessage(''),
    });
  };

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
      <div className="relative flex min-w-0 flex-1">
        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب تعليقاً..."
          minRows={1}
          maxRows={10}
          disabled={isPending}
          className="bg-muted/50 dark:bg-muted ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary flex w-full resize-none overflow-auto rounded-xl border-none px-4 py-2.5 pe-12 text-sm wrap-break-word focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        <button
          onClick={handleSubmit}
          disabled={isPending || !message.trim()}
          className="text-primary hover:bg-primary/10 absolute bottom-1.5 left-2 cursor-pointer rounded-full p-1.5 transition-all disabled:opacity-30"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
