import { z } from 'zod';

export const BoardSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SaveBoardSchema = BoardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  id: z.string().optional(),
});

export type Board = z.infer<typeof BoardSchema>;
export type SaveBoard = z.infer<typeof SaveBoardSchema>;
