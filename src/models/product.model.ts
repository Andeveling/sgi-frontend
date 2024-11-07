import { z } from 'zod';

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  buyPrice: z.number().int(),
  sellPrice: z.number().int(),
  stock: z.number().int().default(0),
  description: z.string().optional(),
  expiration: z.date().optional(),
  minStock: z.number().int(),
  categoryId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  storeId: z.string(),
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;