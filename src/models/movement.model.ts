import { z } from 'zod';

export const MovementTypeEnum = z.enum([
  'INITIAL_STOCK',
  'PURCHASE',
  'SALE',
  'TRANSFER',
]);

export const MovementSchema = z.object({
  id: z.string().cuid().optional(),
  type: MovementTypeEnum,
  quantity: z.number().int().positive(),
  productId: z.string().cuid(),
  product: z
    .object({
      name: z.string(),
    })
    .optional(),
  storeId: z.string().cuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const MovementFormSchema = MovementSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type MovementType = z.infer<typeof MovementTypeEnum>;
export type Movement = z.infer<typeof MovementSchema>;
export type MovementForm = z.infer<typeof MovementFormSchema>;
