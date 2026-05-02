import { z } from 'zod';

export const documentationSchema = z.object({
  personalImage: z
    .any()
    .optional()
    .refine((f) => f === undefined || f instanceof File, {
      message: 'الصورة الشخصية مطلوبة',
    })
    .refine((f) => f === undefined || f.size <= 5 * 1024 * 1024, {
      message: 'حجم الملف يجب ألا يتجاوز 5 ميجابايت',
    }),

  nationalId: z
    .any()
    .optional()
    .refine((f) => f === undefined || f instanceof File, {
      message: 'صورة البطاقة مطلوبة',
    })
    .refine((f) => f === undefined || f.size <= 5 * 1024 * 1024, {
      message: 'حجم الملف يجب ألا يتجاوز 5 ميجابايت',
    }),

  criminalRecord: z
    .any()
    .optional()
    .refine((f) => f === undefined || f instanceof File, {
      message: 'صحيفة الحالة الجنائية مطلوبة',
    })
    .refine((f) => f === undefined || f.size <= 5 * 1024 * 1024, {
      message: 'حجم الملف يجب ألا يتجاوز 5 ميجابايت',
    }),
});

export type DocumentationFormData = z.infer<typeof documentationSchema>;
