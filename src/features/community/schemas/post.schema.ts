import { z } from 'zod';

export const createPostSchema = z.object({
  Title: z.string().min(3, 'العنوان مطلوب'),
  Description: z.string().optional(),
  GovernorateId: z.coerce.number().optional(),
  RegionId: z.coerce.number().optional(),
  Images: z.array(z.instanceof(File)).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
