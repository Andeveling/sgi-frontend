import { z } from 'zod';

const ProductSchema = z
  .object({
    id: z.string(),

    name: z.string(),
    buyPrice: z.coerce.number().int(),
    sellPrice: z.coerce.number().int(),
    stock: z.coerce.number().int().default(0),

    minStock: z.coerce.number().int(),
    maxStock: z.coerce.number().int(),
    
    description: z.string().optional(),
    expiration: z.date().optional(),

    categoryId: z.string().optional(),
    storeId: z.string(),

    createdAt: z.date(),
    updatedAt: z.date(),
  })


export const ProductFormSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).refine((data) => data.buyPrice > data.sellPrice, {
  message: 'Buy price must be greater than sell price',
  path: ['buyPrice'],
}).refine((data) => data.minStock > data.maxStock, {
  message: 'Min stock must be greater than max stock',
  path: ['minStock'],
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductFormType = z.infer<typeof ProductFormSchema>;
