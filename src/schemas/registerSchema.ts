import { z } from "zod";

export const registerSchema = z
  .object({
    accountType: z.enum(["client", "professional"]),
    firstName: z
      .string()
      .min(1, "الاسم الأول مطلوب")
      .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
    lastName: z
      .string()
      .min(1, "اسم العائلة مطلوب")
      .min(2, "اسم العائلة يجب أن يكون حرفين على الأقل"),
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صحيح"),
    phone: z
      .string()
      .min(1, "رقم الهاتف مطلوب")
      .regex(
        /^01[0125][0-9]{8}$/,
        "رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم"
      ),
    password: z
      .string()
      .min(1, "كلمة المرور مطلوبة")
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    terms: z.boolean().refine((val) => val === true, {
      message: "يجب الموافقة على الشروط والأحكام للمتابعة",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;