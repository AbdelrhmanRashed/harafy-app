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
      .email('البريد الإلكتروني غير صحيح')
      .regex(
        /^[a-zA-Z].{2,}@/,
        'يجب أن يبدأ البريد بحرف ويحتوي على 3 أحرف على الأقل قبل @',
      ),
    // phone: z
    //   .string()
    //   .min(1, 'رقم الهاتف مطلوب')
    //   .regex(
    //     /^01[0125][0-9]{8}$/,
    //     'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم',
    //   ),
    password: z
      .string()
      .min(1, 'كلمة المرور مطلوبة')
      .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      .max(15, 'كلمة المرور يجب أن تكون 15 حرف على الأكثر')
      .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير (a-z)')
      .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير (A-Z)')
      .regex(/\d/, 'يجب أن تحتوي على رقم (0-9)')
      .regex(/[\W_]/, 'يجب أن تحتوي على رمز خاص (!@#$...)'),
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
    terms: z.boolean().refine((val) => val === true, {
      message: 'يجب الموافقة على الشروط والأحكام للمتابعة',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export const registerSchemaVerify = z.object({
  mainJob: z.string().min(1, { message: ' الحرفة الأساسية مطلوبة' }),
  subJob: z.string().optional(),

  location: z.string().min(3, { message: ' الموقع الأساسي مطلوب' }),

  serviceAreas: z.string().min(1, { message: ' مناطق الخدمة مطلوبة ' }),

  personalImage: z.any().refine((f) => f instanceof File, {
    message: 'الصورة الشخصية مطلوبة',
  }),

  nationalId: z.any().refine((f) => f instanceof File, {
    message: 'صورة البطاقة مطلوبة',
  }),

  criminalRecord: z.any().refine((f) => f instanceof File, {
    message: 'صحيفة الحالة الجنائية مطلوبة',
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type RegisterFormValuesVerify = z.infer<typeof registerSchemaVerify>;
