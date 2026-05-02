import { z } from 'zod';

export const providerProfileSchema = z.object({
  Bio: z.string().optional(),
  Nickname: z.string().optional(),

  BaseLocation: z.object({
    Latitude: z.coerce.number(),
    Longitude: z.coerce.number(),
    AddressText: z.string(),
  }),

  ServiceIds: z
    .array(z.coerce.number())
    .min(1, 'لازم تختار خدمة واحدة على الأقل')
    .max(2, 'يمكنك اختيار خدمتين كحد أقصى'),
});

export type ProviderProfileFormData = z.infer<typeof providerProfileSchema>;
