import { z } from 'zod';

export const createPostSchema = z.object({
  Title: z.string().min(3, 'العنوان مطلوب'),
  Description: z.string().optional(),
  GovernorateId: z.number().optional(),
  RegionId: z.number().optional(),
  Images: z.array(z.instanceof(File).refine(f => f.size <= 5 * 1024 * 1024, 'حجم الصورة يجب ألا يتجاوز 5 ميجابايت')).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
