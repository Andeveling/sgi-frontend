import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SaveCategorySchema = CategorySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    id: z.string().optional(),
    storeId: z.string(),
  });

export type Category = z.infer<typeof CategorySchema>;
export type SaveCategory = z.infer<typeof SaveCategorySchema>;

