import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  columnId: z.string(),
  position: z.number().int().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string().optional(),
});

export const SaveTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  id: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
export type SaveTask = z.infer<typeof SaveTaskSchema>;
