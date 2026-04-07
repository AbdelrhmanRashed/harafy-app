import { z } from 'zod';

export const verificationSchema = z.object({
  Bio: z.string().optional(),
  Nickname: z.string().optional(),

  // GovernorateId: z.coerce.number().min(1, 'المحافظة مطلوبة'),

  // RegionId: z.coerce.number().min(1, 'المنطقة مطلوبة'),

  BaseLocation: z.object({
    Latitude: z.coerce.number(),

    Longitude: z.coerce.number(),

    AddressText: z.string().min(3, 'العنوان مطلوب'),
  }),

  ServiceIds: z
    .array(z.coerce.number())
    .min(1, 'لازم تختار خدمة واحدة على الأقل'),

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

export type RegisterFormValuesVerify = z.infer<typeof verificationSchema>;
