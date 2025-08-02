import * as z from 'zod';

export const cakeFormSchema = z.object({
  // --- Cake Details ---
  occasion: z.string().min(1, 'Please tell us the occasion for your cake.'),
  date: z.string().min(1, 'Please select a date for your cake order.'),
  tiers: z.enum(['1', '2', '3', '4']).refine((value) => value !== undefined, {
    message: 'Please select how many tiers your cake should have.',
  }),
  filling: z
    .enum(['chocolate', 'vanilla-cream', 'strawberry', 'lemon-curd'])
    .refine((value) => value !== undefined, {
      message: 'Please select a delicious filling for your cake.',
    }),
  cakeStyle: z
    .string()
    .min(1, 'Please describe the style you envision for your cake.'),
  images: z
    .array(z.string())
    .max(3, 'You can upload a maximum of 3 images.')
    .optional(),

  // --- Contact Information ---
  name: z.string().min(1, 'Please provide your full name.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  phone: z.string().min(1, 'A contact phone number is required.').regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
  address: z.string().min(1, 'Please provide your delivery address.'),

  // --- Additional Message ---
  additionalInfo: z
    .string()
    .min(1, 'Please share any additional details for your cake.')
    .max(100, 'Your message must be under 100 characters.'),
});
