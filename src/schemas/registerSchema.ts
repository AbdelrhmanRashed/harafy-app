import { z } from 'zod';
export const registerSchema = z.object({
    mainJob: z.string().min(1, { message: " الحرفة الأساسية مطلوبة" }),
    subJob: z.string().optional(),

    location: z.string().min(3, { message: " الموقع الأساسي مطلوب" }),

    serviceAreas: z.string().min(1, { message: " مناطق الخدمة مطلوبة " }),

    personalImage: z.any().refine((f) => f instanceof File, {
        message: "الصورة الشخصية مطلوبة",
    }),

    nationalId: z.any().refine((f) => f instanceof File, {
        message: "صورة البطاقة مطلوبة",
    }),

    criminalRecord: z.any().refine((f) => f instanceof File, {
        message: "صحيفة الحالة الجنائية مطلوبة",
    }),
});
