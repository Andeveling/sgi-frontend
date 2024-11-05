import { z } from 'zod';

export const storeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  cellphone: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Store = z.infer<typeof storeSchema>;