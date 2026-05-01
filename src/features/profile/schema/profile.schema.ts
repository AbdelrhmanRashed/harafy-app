import { z } from 'zod';

// ─── Schema ───────────────────────────────────────────────────────────────────
// Single schema — provider fields optional at type level,
// enforced at runtime via buildProfileSchema(role)

export const profileSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().regex(/^(\+20|0)1[0125][0-9]{8}$/, 'رقم هاتف غير صحيح'),
  location: z.string().min(2, 'الموقع مطلوب'),
  language: z.string().min(1),
  // provider-only — optional here, required enforced via superRefine
  profession: z.string().optional(),
  serviceArea: z.string().optional(),
  bio: z.string().max(300, 'النبذة لا تتجاوز 300 حرف').optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function buildProfileSchema(role: 'client' | 'provider') {
  if (role !== 'provider') return profileSchema;

  return profileSchema.superRefine((data, ctx) => {
    if (!data.profession || data.profession.length < 1)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'المهنة مطلوبة',
        path: ['profession'],
      });
    if (!data.serviceArea || data.serviceArea.length < 2)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'منطقة الخدمة مطلوبة',
        path: ['serviceArea'],
      });
  });
}

// ─── Password schema ──────────────────────────────────────────────────────────

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
    newPassword: z
      .string()
      .min(1, 'كلمة المرور مطلوبة')
      .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      .max(15, 'كلمة المرور يجب أن تكون 15 حرف على الأكثر')
      .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير (a-z)')
      .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير (A-Z)')
      .regex(/\d/, 'يجب أن تحتوي على رقم (0-9)')
      .regex(/[\W_]/, 'يجب أن تحتوي على رمز خاص (!@#$...)'),
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;

// ─── Update Client Profile schema ─────────────────────────────────────────────

export const updateClientProfileSchema = z.object({
  FirstName: z.string().min(1, 'الاسم الأول مطلوب'),
  LastName: z.string().min(1, 'اسم العائلة مطلوب'),
  Gender: z.union([z.literal(0), z.literal(1)], {
    message: 'الجنس مطلوب',
  }),
  DateOfBirth: z
    .string()
    .min(1, 'تاريخ الميلاد مطلوب')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'تاريخ غير صحيح',
    })
    .refine((val) => new Date(val) <= new Date(), {
      message: 'لا يمكن اختيار تاريخ في المستقبل',
    })
    .refine(
      (val) => {
        const birth = new Date(val);
        const today = new Date();

        const age = today.getFullYear() - birth.getFullYear();

        return age >= 16;
      },
      {
        message: 'يجب أن يكون العمر 16 سنة على الأقل',
      },
    ),
  Picture: z.instanceof(File).refine(f => f.size <= 5 * 1024 * 1024, 'حجم الصورة يجب ألا يتجاوز 5 ميجابايت').optional(),
  // stored as {value: string}[] so react-hook-form useFieldArray works correctly
  PhoneNumbers: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, 'رقم الهاتف مطلوب')
          .transform((val) =>
            val.replace(/\s+/g, '').replace(/^(\+20|0020)/, '0'),
          )
          .refine(
            (val) => /^01[0125][0-9]{8}$/.test(val),
            'رقم الهاتف غير صحيح',
          ),
      }),
    )
    .min(1, 'يجب إضافة رقم هاتف واحد على الأقل')
    .refine(
      (phones) => {
        const values = phones.map((p) => p.value);
        return new Set(values).size === values.length;
      },
      { message: 'لا يمكن تكرار نفس رقم الهاتف' },
    ),
  governorate: z
    .number()
    .min(1, 'المحافظة مطلوبة')
    .optional()
    .refine((val) => val !== undefined, 'المحافظة مطلوبة'),
  region: z
    .number()
    .min(1, 'المنطقة مطلوبة')
    .optional()
    .refine((val) => val !== undefined, 'المنطقة مطلوبة'),
});

export type UpdateClientProfileFormValues = z.infer<
  typeof updateClientProfileSchema
>;
