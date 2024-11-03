import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const firstStoreFormSchema = z.object({
  name: z.string().min(3, 'The name has to be at least 3 characters long'),
  description: z.string().optional(),
  address: z.string().optional(),
  cellphone: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
});

export type FirstStoreFormType = z.infer<typeof firstStoreFormSchema>;
export type CreateStoreType = z.infer<typeof firstStoreFormSchema>;
