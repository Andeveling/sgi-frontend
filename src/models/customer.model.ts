import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, 'The min length is 3'),
  email: z.string().email('Invalid email'),
  cellphone: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  identification: z.string().min(1, 'Identification is required'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CustomerFormSchema = CustomerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerForm = z.infer<typeof CustomerFormSchema>;