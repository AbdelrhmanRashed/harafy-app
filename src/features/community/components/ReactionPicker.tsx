// features/community/components/ReactionPicker.tsx
import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import {
  REACTIONS,
  getReactionEmoji,
  getReactionLabel,
} from '../constants/reactions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ReactionsDialog from './ReactionsDialog';

interface ReactionPickerProps {
  id: number;
  type: 'post' | 'comment';
  userReaction: number | null;
  totalCount: number;
  topReactions: { reactionType: number; count: number }[];
  onReact: (reactionType: number) => void;
}

const ReactionPicker = ({
  id,
  type,
  userReaction,
  totalCount,
  topReactions,
  onReact,
}: ReactionPickerProps) => {
  const [reactionsDialogOpen, setReactionsDialogOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasReaction = userReaction !== 0 && userReaction !== null;

  const top3 = [...topReactions].sort((a, b) => b.count - a.count).slice(0, 3);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    timerRef.current = setTimeout(() => setShowPicker(true), 400);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    hideTimerRef.current = setTimeout(() => setShowPicker(false), 200);
  };

  const handleReact = (type: number) => {
    onReact(type);
    setShowPicker(false);
  };

  return (
    <>
      <div className="flex items-center">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Reaction Picker Popup */}
          <AnimatePresence>
            {showPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onMouseEnter={() => {
                  if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="bg-card absolute right-0 bottom-10 z-50 flex items-end gap-1 rounded-full border px-4 py-2.5 shadow-2xl"
              >
                {REACTIONS.map((reaction, i) => (
                  <motion.div
                    key={reaction.type}
                    className="relative flex flex-col items-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: i * 0.04,
                      type: 'spring',
                      stiffness: 400,
                    }}
                  >
                    {/* Label */}
                    <AnimatePresence>
                      {hoveredReaction === reaction.type && (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="bg-foreground text-background absolute -top-10 rounded-md px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap"
                        >
                          {reaction.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Emoji Button */}
                    <motion.button
                      onClick={() => handleReact(reaction.type)}
                      onHoverStart={() => setHoveredReaction(reaction.type)}
                      onHoverEnd={() => setHoveredReaction(null)}
                      whileHover={{ scale: 1.5, y: -8 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 20,
                      }}
                      className={cn(
                        'text-2xl leading-none outline-none',
                        hasReaction &&
                          userReaction === reaction.type &&
                          'drop-shadow-lg',
                      )}
                    >
                      {reaction.emoji}
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReact(hasReaction ? userReaction! : 1)}
            className={cn(
              'flex h-9 items-center gap-1.5 rounded-lg px-2 hover:bg-transparent',
              hasReaction
                ? 'text-primary font-semibold'
                : 'text-muted-foreground hover:text-primary',
            )}
          >
            {hasReaction ? (
              <span className="text-base">
                {getReactionEmoji(userReaction!)}
              </span>
            ) : (
              <Heart className="size-4" />
            )}
            <span className="text-sm">
              {hasReaction ? getReactionLabel(userReaction!) : 'إعجاب'}
            </span>
          </Button>
        </div>

        {totalCount > 0 && (
          <button
            onClick={() => setReactionsDialogOpen(true)}
            className="hover:bg-muted flex items-center gap-1 rounded-lg px-1 py-1 transition"
          >
            <div className="flex items-center">
              {top3.map((r, i) => (
                <span
                  key={r.reactionType}
                  className="text-base leading-none"
                  style={{ marginLeft: i > 0 ? '-4px' : 0 }}
                >
                  {getReactionEmoji(r.reactionType)}
                </span>
              ))}
            </div>
            <span className="text-muted-foreground text-sm font-semibold">
              {totalCount}
            </span>
          </button>
        )}
      </div>

      <ReactionsDialog
        id={id}
        type={type}
        open={reactionsDialogOpen}
        onClose={() => setReactionsDialogOpen(false)}
      />
    </>
  );
};

export default ReactionPicker;
