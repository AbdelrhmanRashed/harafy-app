import { z } from 'zod';

export const EditPostSchema = z.object({
  title: z.string().min(1, 'العنوان مطلوب'),
  description: z.string().optional().default(''),
});

export type FormValues = z.infer<typeof EditPostSchema>;
