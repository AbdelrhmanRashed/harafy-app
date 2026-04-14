// review.schema.ts
import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1, 'التقييم مطلوب').max(5),
  message: z.string().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
