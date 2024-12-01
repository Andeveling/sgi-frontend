import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.string(), // ID del autor del comentario
  name: z.string().min(1).max(100), // Nombre del autor del comentario
  avatar: z.string().url(), // URL de la imagen de avatar del autor del comentario
});


export const TaskCommentSchema = z.object({
  id: z.string(), // ID del comentario
  taskId: z.string(), // ID de la tarea asociada
  content: z.string().min(1).max(1000), // Contenido del comentario
  userId: z.string(), // ID del usuario que creó el comentario
  author: AuthorSchema, // Información del autor del comentario
  createdAt: z.string(), // Fecha de creación
  updatedAt: z.string(), // Fecha de última actualización
});

export const SaveTaskCommentSchema = TaskCommentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  author: true,
}).extend({
  id: z.string().optional(),
});

export type TaskComment = z.infer<typeof TaskCommentSchema>;
export type SaveTaskComment = z.infer<typeof SaveTaskCommentSchema>;
