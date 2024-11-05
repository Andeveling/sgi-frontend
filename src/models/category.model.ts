import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const saveCategorySchema = categorySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    id: z.string().optional(),
    storeId: z.string(),
  });

export type Category = z.infer<typeof categorySchema>;
export type SaveCategory = z.infer<typeof saveCategorySchema>;

