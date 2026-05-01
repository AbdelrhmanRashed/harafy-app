import { z } from 'zod';

export const verificationSchema = z.object({
  Bio: z.string().optional(),
  Nickname: z.string().optional(),

  // GovernorateId: z.coerce.number().min(1, 'المحافظة مطلوبة'),

  // RegionId: z.coerce.number().min(1, 'المنطقة مطلوبة'),

  BaseLocation: z.object({
    Latitude: z.coerce.number(),

    Longitude: z.coerce.number(),

    AddressText: z.string(),
  }),

  ServiceIds: z
    .array(z.coerce.number())
    .min(1, 'لازم تختار خدمة واحدة على الأقل')
    .max(2, 'يمكنك اختيار خدمتين كحد أقصى'),

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

export type RegisterFormValuesVerify = z.infer<typeof verificationSchema>;
