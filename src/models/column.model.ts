import { z } from 'zod';

export const ColumnSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(100),
  position: z.number().int().nonnegative(), // Para la posición de la columna
  boardId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SaveColumnSchema = ColumnSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  id: z.string().optional(),
});

export type Column = z.infer<typeof ColumnSchema>;
export type SaveColumn = z.infer<typeof SaveColumnSchema>;
