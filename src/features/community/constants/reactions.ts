export const REACTIONS = [
  { type: 1, emoji: '👍', label: 'إعجاب' },
  { type: 2, emoji: '❤️', label: 'حب' },
  { type: 3, emoji: '😂', label: 'ضحك' },
  { type: 4, emoji: '😡', label: 'غضب' },
  { type: 5, emoji: '😢', label: 'حزن' },
] as const;

export const getReactionEmoji = (type: number) =>
  REACTIONS.find((r) => r.type === type)?.emoji ?? '👍';

export const getReactionLabel = (type: number) =>
  REACTIONS.find((r) => r.type === type)?.label ?? 'إعجاب';
