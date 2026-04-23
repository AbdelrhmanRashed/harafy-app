import { z } from 'zod';

export const registerSchema = z
  .object({
    isProvider: z.boolean(),
    firstName: z
      .string()
      .min(1, 'الاسم الأول مطلوب')
      .min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل'),
    lastName: z
      .string()
      .min(1, 'اسم العائلة مطلوب')
      .min(2, 'اسم العائلة يجب أن يكون حرفين على الأقل'),
    email: z
      .string()
      .min(1, 'البريد الإلكتروني مطلوب')
      .trim()
      .email('البريد الإلكتروني غير صحيح')
      .regex(
        /^[a-zA-Z].{2,}@/,
        'يجب أن يبدأ البريد بحرف ويحتوي على 3 أحرف على الأقل قبل @',
      ),
    password: z
      .string()
      .min(1, 'كلمة المرور مطلوبة')
      .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      .trim()
      .max(15, 'كلمة المرور يجب أن تكون 15 حرف على الأكثر')
      .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير (a-z)')
      .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير (A-Z)')
      .regex(/\d/, 'يجب أن تحتوي على رقم (0-9)')
      .regex(/[\W_]/, 'يجب أن تحتوي على رمز خاص (!@#$...)'),
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب').trim(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'يجب الموافقة على الشروط والأحكام للمتابعة',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
