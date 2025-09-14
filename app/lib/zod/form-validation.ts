import * as z from 'zod';

export const cakeFormSchema = z.object({
  // --- Cake Details ---
  occasion: z.string().min(1, 'Please tell us the occasion for your cake.').max(30, 'Occasion must be less than 30 characters.'),
  delivery_date: z.string().min(1, 'Please select a date for your cake order.'),
  cake_tiers: z
    .enum(['1', '2', '3', '4'])
    .refine((value) => value !== undefined, {
      message: 'Please select how many tiers your cake should have.',
    }),
  filling: z
    .enum(['chocolate', 'vanilla-cream', 'strawberry', 'lemon-curd'])
    .refine((value) => value !== undefined, {
      message: 'Please select a delicious filling for your cake.',
    }),
  description: z
    .string()
    .min(1, 'Please describe the style you envision for your cake.').max(150, 'Description must be less than 150 characters.'),
  images: z
    .array(z.instanceof(File))
    .max(3, 'You can upload a maximum of 3 images.')
    .optional(),

  // --- Contact Information ---
  name: z.string().min(1, 'Please provide your full name.').max(40, 'Name must be less than 40 characters.'),
  email: z.email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(1, 'A contact phone number is required.')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
  delivery_address: z.string().min(1, 'Please provide your delivery address.').max(100, 'Delivery address must be less than 100 characters.'),

  // --- Additional Message ---
  requests: z
    .string()
    .min(1, 'Please share any additional details for your cake.')
    .max(60, 'Your message must be under 60 characters.'),
});
