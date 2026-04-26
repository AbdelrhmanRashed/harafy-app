import { cn } from '@/lib/utils';
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react';
import { useTheme } from '@/hooks/useTheme';
import { useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

const EmojiContainer = ({
  showEmoji,
  setMessage,
  setShowEmoji,
  onEmojiClick,
  className,
}: {
  showEmoji: boolean;
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
  setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  onEmojiClick?: (emoji: string) => void;
  className?: string;
}) => {
  const { theme } = useTheme();

  // ref for emoji picker
  const emojiRef = useRef<HTMLDivElement | null>(null);

  // Close emoji picker when clicking outside
  useClickOutside(emojiRef, () => {
    if (showEmoji) setShowEmoji(false);
  });

  return (
    <div
      ref={emojiRef}
      className={cn(
        'absolute z-999999',
        // desktop
        'bottom-12 left-2',
        // mobile
        'max-sm:bottom-12 max-sm:-left-1/2 max-sm:translate-x-1/3',
        className,
      )}
    >
      <div className="emoji-scroll overflow-hidden rounded-xl shadow-lg">
        <EmojiPicker
          open={showEmoji}
          theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}
          emojiStyle={EmojiStyle.NATIVE}
          skinTonesDisabled={true}
          previewConfig={{ showPreview: false }}
          lazyLoadEmojis={true}
          className="shadow-xl"
          style={
            {
              '--epr-bg-color': 'var(--card)',
              '--epr-category-label-text-color': 'var(--foreground)',
              '--epr-search-input-bg-color': 'var(--secondary)',
              '--epr-search-input-text-color': 'var(--foreground)',
              '--epr-search-input-placeholder-color': 'var(--muted-foreground)',
              '--epr-focus-bg-color': 'var(--accent)',
              '--epr-category-icon-active-color': 'var(--primary)',
            } as React.CSSProperties
          }
          // width="100%"
          height={350}
          searchPlaceholder="ابحث..."
          onEmojiClick={(emojiData) => {
            if (onEmojiClick) {
              onEmojiClick(emojiData.emoji);
            } else if (setMessage) {
              setMessage((prev) => prev + emojiData.emoji);
            }
          }}
        />
      </div>
    </div>
  );
};

export default EmojiContainer;
