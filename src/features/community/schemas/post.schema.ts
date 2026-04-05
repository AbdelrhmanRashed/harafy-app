import { z } from 'zod';

export const createPostSchema = z.object({
  Title: z.string().min(3, 'العنوان مطلوب'),
  Description: z.string().optional(),
  GovernorateId: z.number().optional(),
  RegionId: z.number().optional(),
  Images: z.array(z.instanceof(File)).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
