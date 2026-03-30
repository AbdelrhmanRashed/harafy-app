import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'البريد الإلكتروني غير صالح' }),

  password: z
    .string()
    .min(1, { message: 'كلمة المرور مطلوبة' })
    .min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }),
});
