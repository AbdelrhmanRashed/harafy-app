import { z } from 'zod';

export const createServiceReqSchema = z.object({
  Description: z
    .string()
    .min(1, 'وصف المشكلة مطلوب')
    .min(10, 'يرجى كتابة وصف أكثر تفصيلاً (10 أحرف على الأقل)'),

  ServiceId: z
    .number()
    .refine((v) => v > 0, { message: 'يرجى اختيار نوع الخدمة' }),

  Latitude: z
    .number()
    .refine((v) => v !== 0, {
      message: 'يرجى تحديد موقعك على الخريطة أو الضغط على زر التحديد التلقائي',
    }),

  Longitude: z
    .number()
    .refine((v) => v !== 0, { message: 'خط الطول غير صالح' }),

  Images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (f) => f.size <= 5 * 1024 * 1024,
          'حجم الصورة يجب ألا يتجاوز 5 ميجابايت',
        ),
    )
    .optional(),
});

export type CreateServiceReqInput = z.infer<typeof createServiceReqSchema>;
