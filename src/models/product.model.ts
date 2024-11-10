import { z } from 'zod';

const ProductSchema = z.object({
  id: z.string(),

  name: z.string(),
  buyPrice: z.coerce.number().int(),
  sellPrice: z.coerce.number().int(),
  stock: z.coerce.number().int().default(0),
  minStock: z.coerce.number().int().optional(),

  description: z.string().optional(),
  expiration: z.date().optional(),

  categoryId: z.string().optional(),
  storeId: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const ProductFormSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateProductSchema = ProductSchema.partial();

export type Product = z.infer<typeof ProductSchema>;
export type ProductFormType = z.infer<typeof ProductFormSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
