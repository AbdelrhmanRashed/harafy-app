import { z } from "zod";

// ─── Schema ───────────────────────────────────────────────────────────────────
// Single schema — provider fields optional at type level,
// enforced at runtime via buildProfileSchema(role)

export const profileSchema = z.object({
  name:        z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email:       z.string().email("البريد الإلكتروني غير صحيح"),
  phone:       z.string().regex(/^(\+20|0)1[0125][0-9]{8}$/, "رقم هاتف غير صحيح"),
  location:    z.string().min(2, "الموقع مطلوب"),
  language:    z.string().min(1),
  // provider-only — optional here, required enforced via superRefine
  profession:  z.string().optional(),
  serviceArea: z.string().optional(),
  bio:         z.string().max(300, "النبذة لا تتجاوز 300 حرف").optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function buildProfileSchema(role: "client" | "provider") {
  if (role !== "provider") return profileSchema;

  return profileSchema.superRefine((data, ctx) => {
    if (!data.profession || data.profession.length < 1)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "المهنة مطلوبة",
        path: ["profession"],
      });
    if (!data.serviceArea || data.serviceArea.length < 2)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "منطقة الخدمة مطلوبة",
        path: ["serviceArea"],
      });
  });
}

// ─── Password schema ──────────────────────────────────────────────────────────

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword:     z.string().min(8, "8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
